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
            padding: ["20px 20px", "20px 20px", "20px 0px"],
            margin: "0 auto",
            boxSizing: "content-box",
            width: ["180px", "180px", "100%"],
            height: "100%",
            right: "0px",
            top: "0px",
            backgroundColor: ["rgba(255,255,255,0.9)", "none", "none"],
            display: "flex",
            flexDirection: ["column", "column", "row"],
            position: ["fixed", "fixed", "relative"],
            zIndex: "999",
            transition: "transform 0.3s ease-in-out",
            transform: [
              open.open ? "translateX(0%)" : "translateX(100%)",
              open.open ? "translateX(0%)" : "translateX(100%)",
              "none",
            ],
          }}
        >
          {data.sanityMenu._rawChildren.map((menuItem, index) => (
            <div
              key={index}
              sx={{
                width: ["100%", "100%", "calc(100% / 7)"],
                position: "relative",
                marginBottom: "10px",
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
                  fontSize: ["24px", "18px", "18px"],
                }}
                to={"/" + menuItem.children.document.slug.current}
              >
                {menuItem.children.title}
              </Link>
              {menuItem.children.submenu && (
                <div
                  sx={{
                    visibility: ["visible", "visible", "hidden"],
                    opacity: ["1", "1", "0"],
                    position: ["relative", "relative", "absolute"],
                    transition: "all 0.5s ease",
                    paddingTop: ["0px", "0px", "1rem"],
                    left: 0,
                    display: ["block", "block", "none"],
                    minWidth: ["auto", "auto", "300px"],
                  }}
                >
                  {menuItem.children.submenu.map((menuSubItem, index) => (
                    <Link
                      sx={{
                        color: "black",
                        textDecoration: "none",
                        display: "block",
                        padding: ["0px 0px", "0px 0px", "10px 0px"],
                        backgroundColor: "white",
                        fontSize: "16px",
                        textWrap: "wrap",
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
