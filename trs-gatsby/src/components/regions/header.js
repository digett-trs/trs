/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
export default function Header() {
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
              padding: "0px 10%",
              margin: "0 auto",
            }}
          >
            <Link to={"/"}>
              <GatsbyImage
                sx={{
                  maxWidth: "600px",
                }}
                image={data.sanitySiteSettings.logo.asset.gatsbyImageData}
              />
            </Link>
            <div
              sx={{
                padding: "20px 0px",
                margin: "0 auto",
                boxSizing: "content-box",
                display: "flex",
              }}
            >
              {data.sanityMenu._rawChildren.map((menuItem, index) => (
                <div
                  key={index}
                  sx={{
                    width: "calc(100% / 7)",
                    position: "relative",
                    "&:hover > div": {
                      display: "block",
                      visibility: "visible",
                      opacity: 1,
                    },
                  }}
                >
                  <Link
                    sx={{
                      color: "black",
                      textDecoration: "none",
                    }}
                    to={"/" + menuItem.children.document.slug.current}
                  >
                    {menuItem.children.title}
                  </Link>
                  {menuItem.children.submenu && (
                    <div
                      sx={{
                        visibility: "hidden",
                        opacity: 0,
                        position: "absolute",
                        transition: "all 0.5s ease",
                        paddingTop: "1rem",
                        left: 0,
                        display: "none",
                        minWidth: "300px",
                      }}
                    >
                      {menuItem.children.submenu.map((menuSubItem, index) => (
                        <Link
                          sx={{
                            color: "black",
                            textDecoration: "none",
                            display: "block",
                            padding: "10px 0px",
                            backgroundColor: "white",
                          }}
                          to={"/" + menuSubItem.document.slug.current}
                        >
                          {menuSubItem.document.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </header>
      )}
    />
  )
}
