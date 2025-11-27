// Tokens simplificados derivados de desing-system.json
export const colors = {
  primary: "#0A1626",
  primary2: "#222D3B",
  accent: "#3B4451",
  muted: "#535B67",
  light: "#CED0D3",
  white: "#FFFFFF",
  success: "#2AA84A",
  warning: "#F2A400",
  danger: "#E14B4B",
  info: "#2E8BFF"
} as const;

export const typography = {
  fontFamily: "'Albert Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  h1: { size: "48px", lineHeight: "56px", weight: 700 },
  h2: { size: "36px", lineHeight: "44px", weight: 600 },
  h3: { size: "28px", lineHeight: "36px", weight: 600 },
  body: { size: "16px", lineHeight: "24px", weight: 400 }
} as const;

export const layout = {
  containerMaxWidth: "1200px",
  gutter: "24px"
} as const;


