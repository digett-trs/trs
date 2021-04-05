export default {
  initialColorModeName: "light",
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#33e",
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        primary: "#cc1",
      },
    },
  },
  breakpoints: ["400px", "800px", "1000px"],
}
