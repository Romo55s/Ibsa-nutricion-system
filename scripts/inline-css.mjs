import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const outputDir = resolve(process.cwd(), "dist");
const stylesheetFiles = new Set();

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
  const stylesheetLinks = html.match(
    /<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*>/gi
  );

  if (!stylesheetLinks) continue;

  for (const link of stylesheetLinks) {
    const href = link.match(/\bhref=["']([^"']+\.css)["']/i)?.[1];
    if (!href || !href.startsWith("/")) {
      throw new Error(`Unable to resolve stylesheet link in ${htmlPath}: ${link}`);
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

console.log(
  `Inlined ${stylesheetFiles.size} stylesheet(s) across generated HTML pages.`
);
