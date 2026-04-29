const htmlLib = require("./_lib/buildBreakfastGuideHtml");
const chromeLib = require("./_lib/launchChromium");
const guideContent = require("../src/data/breakfastGuideContent");

function getBaseUrl(req: any): string {
  const h = req.headers;
  const host = (h["x-forwarded-host"] || h.host) as string | undefined;
  if (!host) {
    return (
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:5173"
    );
  }
  const proto = (h["x-forwarded-proto"] as string) || "https";
  return `${proto}://${host}`;
}

module.exports = async function handler(req: any, res: any): Promise<void> {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "GET" && req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.end("Method Not Allowed");
    return;
  }

  let browser;
  try {
    const baseUrl = getBaseUrl(req);
    const html = htmlLib.buildBreakfastGuideHtml(baseUrl);

    browser = await chromeLib.launchChromiumForPdf();
    const page = await browser.newPage();
    // Hobby: límite ~10s de CPU; `networkidle0` + Google Fonts suele colgar y mata la función.
    await page.setContent(html, { waitUntil: "load", timeout: 9000 });
    await page
      .waitForFunction(
        () => [...document.images].every((img) => img.complete),
        { timeout: 8000 },
      )
      .catch(() => {
        /* imágenes lentas: seguimos con lo que haya cargado */
      });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
      preferCSSPageSize: false,
    });

    await browser.close();
    browser = undefined;

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${guideContent.guideMeta.pdfFileName}"`,
    );
    res.setHeader("Cache-Control", "no-store");
    res.end(pdfBuffer);
  } catch (e) {
    if (browser) {
      try {
        await browser.close();
      } catch {
        /* ignore */
      }
    }
    console.error("[render-guide-pdf]", e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("No se pudo generar el PDF. Revisa que Chromium/Chrome esté disponible.");
  }
};
