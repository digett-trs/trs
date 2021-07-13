/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./regions/header"
import Footer from "./regions/footer"
import "./layout.css"
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
  return (
    <>
      <Header></Header>
      <div
        sx={{
          maxWidth: ["400px", "800px", "1000px"],
          padding: ["0px 5%", "0px 7%", "0px 10%"],
          margin: "0 auto",
          boxSizing: "content-box",
          a: {
            textDecoration: "none",
            color: "text",
          },
        }}
      >
        <main>{children}</main>
      </div>
      <Footer></Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
