import puppeteer from "puppeteer-core";
import type { Browser } from "puppeteer-core";

/**
 * Vercel / Lambda: @sparticuz/chromium + puppeteer-core.
 * Local (Windows/Mac): Chrome instalado (channel "chrome").
 */
export async function launchChromiumForPdf(): Promise<Browser> {
  if (process.env.VERCEL === "1") {
    const chromium = (await import("@sparticuz/chromium")).default;
    const withGraphics = chromium as typeof chromium & {
      setGraphicsMode?: (enabled: boolean) => void;
    };
    withGraphics.setGraphicsMode?.(false);
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  return puppeteer.launch({
    channel: "chrome",
    headless: true,
  });
}
