const { colors, boxShadow, fontSize } = require("./brand/tokens.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors,
      boxShadow,
      fontSize,
    },
  },
};
