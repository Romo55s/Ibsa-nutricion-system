import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const outputDir = resolve(process.cwd(), "dist");
const stylesheetFiles = new Set();
const manifestPath = resolve(outputDir, ".vite/manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const homeEntryKey = Object.keys(manifest).find((key) =>
  key.endsWith("src/pages/Home.tsx")
);

if (!homeEntryKey) {
  throw new Error("Unable to find the home page entry in the Vite manifest.");
}

const homePreloadFiles = new Set();
const visitedHomeDependencies = new Set();
const collectHomeDependencies = (key) => {
  if (visitedHomeDependencies.has(key)) return;
  visitedHomeDependencies.add(key);
  const entry = manifest[key];
  if (!entry) return;
  if (entry.file?.endsWith(".js")) homePreloadFiles.add(entry.file);
  for (const dependency of entry.imports ?? []) {
    collectHomeDependencies(dependency);
  }
};
collectHomeDependencies(homeEntryKey);
const mainEntryFile = manifest["index.html"]?.file;
homePreloadFiles.delete(mainEntryFile);
const homePreloadScript = `<script>(function(){if(window.location.pathname!=="/")return;for(const href of ${JSON.stringify(
  [...homePreloadFiles].map((file) => `/${file}`)
)}){const link=document.createElement("link");link.rel="modulepreload";link.href=href;document.head.appendChild(link);}})();</script>`;

const collectHtmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return collectHtmlFiles(path);
      return entry.isFile() && entry.name.endsWith(".html") ? [path] : [];
    })
  );

  return files.flat();
};

for (const htmlPath of await collectHtmlFiles(outputDir)) {
  let html = await readFile(htmlPath, "utf8");

  if (htmlPath === resolve(outputDir, "index.html")) {
    html = html.replace("</head>", `    ${homePreloadScript}\n  </head>`);
  }

  const stylesheetLinks = html.match(
    /<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*>/gi
  );

  if (!stylesheetLinks) continue;

  for (const link of stylesheetLinks) {
    const href = link.match(/\bhref=["']([^"']+\.css)["']/i)?.[1];
    if (!href || !href.startsWith("/")) {
      throw new Error(
        `Unable to resolve stylesheet link in ${htmlPath}: ${link}`
      );
    }

    const stylesheetPath = resolve(outputDir, `.${href}`);
    const pathFromOutput = relative(outputDir, stylesheetPath);
    if (pathFromOutput.startsWith(`..${sep}`) || pathFromOutput === "..") {
      throw new Error(`Stylesheet path escapes build output: ${href}`);
    }

    const css = await readFile(stylesheetPath, "utf8");
    stylesheetFiles.add(stylesheetPath);
    html = html.replace(link, `<style>${css}</style>`);
  }

  await writeFile(htmlPath, html, "utf8");
}

for (const stylesheetPath of stylesheetFiles) {
  await rm(stylesheetPath, { force: true });
}
await rm(manifestPath, { force: true });

console.log(
  `Inlined ${stylesheetFiles.size} stylesheet(s) across generated HTML pages.`
);
