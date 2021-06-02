/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Burger from "../burger"
import Menu from "../menu"
class Header extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      menuOpen: false,
    }
    this.toggleFilters = this.toggleFilters.bind(this)
  }
  toggleFilters() {
    this.setState(prevState => ({
      filtersOpen: !prevState.filtersOpen,
    }))
    console.log(this.state.filtersOpen)
  }
  render() {
    return (
      <StaticQuery
        query={graphql`
          query HeadingQuery {
            sanityMenu {
              title
              _rawChildren(resolveReferences: { maxDepth: 10 })
            }
            sanitySiteSettings {
              logo {
                asset {
                  gatsbyImageData
                }
              }
            }
          }
        `}
        render={data => (
          <header>
            <div
              sx={{
                maxWidth: ["400px", "800px", "1000px"],
                padding: ["15px 5%", "15px 10%", "15px 10%"],
                margin: "0 auto",
                display: ["flex", "null", "null"],
                justifyContent: "space-between",
              }}
            >
              <Link
                to={"/"}
                sx={{
                  maxWidth: "220px",
                }}
              >
                <GatsbyImage
                  sx={{
                    maxWidth: "600px",
                  }}
                  image={data.sanitySiteSettings.logo.asset.gatsbyImageData}
                />
              </Link>
              <Burger></Burger>
              <div
                sx={{
                  padding: "20px 0px",
                  margin: "0 auto",
                  boxSizing: "content-box",
                  display: ["none", "flex", "flex"],
                }}
              >
                <Menu></Menu>
              </div>
            </div>
          </header>
        )}
      />
    )
  }
}
