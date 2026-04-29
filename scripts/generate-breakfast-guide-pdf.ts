/**
 * Genera el PDF estático en `public/` a partir del mismo contenido que la web.
 *
 * Requisitos: Google Chrome instalado (puppeteer-core con channel "chrome").
 * Las imágenes se leen desde `public/` (data URLs), no hace falta `npm run dev`.
 */
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import puppeteer from "puppeteer-core";
import { guideMeta } from "../src/data/breakfastGuideContent";
import { buildBreakfastGuidePdfHtml } from "../src/lib/buildBreakfastGuidePdfHtml";

async function main(): Promise<void> {
  const publicDir = process.env.PDF_PUBLIC_DIR
    ? resolve(process.env.PDF_PUBLIC_DIR)
    : join(cwd(), "public");

  const browser = await puppeteer.launch({
    channel: "chrome",
    headless: true,
  });

  try {
    const page = await browser.newPage();
    const html = buildBreakfastGuidePdfHtml("", {
      localPublicRoot: publicDir,
    });
    await page.setContent(html, { waitUntil: "load", timeout: 60000 });
    await page
      .waitForFunction(
        () => [...document.images].every((img) => img.complete),
        { timeout: 20000 },
      )
      .catch(() => {
        /* continuar si alguna imagen tarda */
      });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
      preferCSSPageSize: false,
    });

    const outPath = join(cwd(), "public", guideMeta.pdfFileName);
    writeFileSync(outPath, pdfBuffer);
    console.log(`PDF escrito: ${outPath}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
