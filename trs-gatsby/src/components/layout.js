/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import { useColorMode } from "theme-ui"
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const [colorMode, setColorMode] = useColorMode()

  const nextColorMode = colorMode === "light" ? "dark" : "light"

  return (
    <>
      <div
        sx={{
          // this uses the value from `theme.space[4]`
          maxWidth: ['400px', '800px', '1000px'],
          padding: "0px 10%",
          margin: "0 auto",
          boxSizing: "content-box"
          // these use values from `theme.colors`
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built by
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
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
