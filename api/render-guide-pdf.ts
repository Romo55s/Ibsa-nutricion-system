import type { IncomingMessage, ServerResponse } from "http";
import { buildBreakfastGuideHtml } from "./_lib/buildBreakfastGuideHtml";
import { launchChromiumForPdf } from "./_lib/launchChromium";
import { guideMeta } from "../src/data/breakfastGuideContent";

function getBaseUrl(req: IncomingMessage): string {
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

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
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
    const html = buildBreakfastGuideHtml(baseUrl);

    browser = await launchChromiumForPdf();
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 45_000,
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
      `attachment; filename="${guideMeta.pdfFileName}"`,
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
}
