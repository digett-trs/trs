/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode()
  const nextColorMode = colorMode === "light" ? "dark" : "light"
  return (
    <footer>
      <div
        sx={{
          maxWidth: ["400px", "800px", "1000px"],
          padding: "0px 10%",
          margin: "0 auto",
          boxSizing: "content-box",
        }}
      >
        © , Built by
        {` `}
        <a href="https://digett.com">Digett</a>
        <button
          sx={{
            marginLeft: 20,
          }}
          onClick={e => {
            setColorMode(nextColorMode)
          }}
        >
          Change color mode
        </button>
      </div>
    </footer>
  )
}

export default Footer
