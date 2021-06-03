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
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu() {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen,
    }))
    console.log(this.state.menuOpen)
  }
  render() {
    return (
      <StaticQuery
        query={graphql`
          query HeadingQuery {
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
              <Burger clickMe={this.toggleMenu} open={this.state.menuOpen} />
              <Menu open={this.state.menuOpen}></Menu>
            </div>
          </header>
        )}
      />
    )
  }
}

export default Header
