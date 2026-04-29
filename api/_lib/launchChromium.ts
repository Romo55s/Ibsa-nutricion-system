const puppeteer = require("puppeteer-core");

/**
 * Vercel / Lambda: @sparticuz/chromium + puppeteer-core.
 * Local (Windows/Mac): Chrome instalado (channel "chrome").
 */
function useServerlessChromium(): boolean {
  // `VERCEL=1` no siempre está presente; en deploys reales viene `VERCEL_ENV`.
  // `development` = `vercel dev` local → usar Chrome del sistema (p. ej. Windows).
  const env = process.env.VERCEL_ENV;
  return env === "production" || env === "preview";
}

async function launchChromiumForPdfImpl() {
  if (useServerlessChromium()) {
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

module.exports = { launchChromiumForPdf: launchChromiumForPdfImpl };
