/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

const Menu = open => {
  return (
    <StaticQuery
      query={graphql`
        query MenuQuery {
          sanityMenu {
            title
            _rawChildren(resolveReferences: { maxDepth: 10 })
          }
        }
      `}
      render={data => (
        <div
          sx={{
            padding: ["20px 20px", "20px 0px", "20px 0px"],
            margin: "0 auto",
            boxSizing: "content-box",
            width: ["180px", "100%", "100%"],
            height: "100%",
            right: "0px",
            top: "0px",
            backgroundColor: ["rgba(255,255,255,0.9)", "none", "none"],
            display: "flex",
            flexDirection: ["column", "row", "row"],
            position: ["fixed", "relative", "relative"],
            zIndex: "1000",
            transition: "transform 0.3s ease-in-out",
            transform: [
              open.open ? "translateX(0%)" : "translateX(100%)",
              "none",
              "none",
            ],
          }}
        >
          {data.sanityMenu._rawChildren.map((menuItem, index) => (
            <div
              key={index}
              sx={{
                width: ["100%", "calc(100% / 7)", "calc(100% / 7)"],
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
      )}
    />
  )
}

export default Menu
