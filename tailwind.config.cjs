/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A1626",
        "primary-2": "#222D3B",
        accent: "#3B4451",
        muted: "#535B67",
        light: "#CED0D3"
      },
      fontFamily: {
        sans: ['"Albert Sans"', "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"]
      },
      borderRadius: {
        md: "12px",
        lg: "20px",
        pill: "9999px"
      },
      boxShadow: {
        "elev-1": "0 1px 4px rgba(10,22,38,0.06)",
        "elev-2": "0 6px 18px rgba(10,22,38,0.08)",
        "elev-3": "0 18px 40px rgba(10,22,38,0.12)"
      }
    }
  },
  plugins: []
};


