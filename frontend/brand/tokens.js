const raw = require("./colors_typography.json");

const styles = Array.isArray(raw.styles) ? raw.styles : [];

const colors = Object.fromEntries(
  styles
    .filter((s) => s.type === "COLOR")
    .map((s) => [s.name.replace(/--/g, "-"), s.value])
);

const boxShadow = Object.fromEntries(
  styles
    .filter((s) => s.type === "EFFECT")
    .map((s) => [s.name.replace(/--/g, "-"), s.value])
);

// Tailwind fontSize expects [fontSize, { lineHeight, fontWeight }]
const fontSize = Object.fromEntries(
  styles
    .filter((s) => s.type === "TEXT" && Array.isArray(s.value))
    .map((s) => {
      const [size, lineHeight, weight] = s.value;
      return [
        s.name,
        [
          size,
          {
            lineHeight: typeof lineHeight === "number" ? lineHeight : 1.5,
            fontWeight: weight ?? 400,
          },
        ],
      ];
    })
);

module.exports = { colors, boxShadow, fontSize };
