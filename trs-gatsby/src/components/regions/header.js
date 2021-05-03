/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

export default function Header() {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          sanityMenu {
            title
            _rawChildren(resolveReferences: { maxDepth: 10 })
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
              boxSizing: "content-box",
              display: "flex",
            }}
          >
            {console.log(data)}
            {data.sanityMenu._rawChildren.map((menuItem, index) => (
              <div
                key={index}
                sx={{
                  width: "calc(100% / 7)",
                }}
              >
                <Link to={"/" + menuItem.children.document.slug.current}>
                  {menuItem.children.title}
                </Link>
                {menuItem.children.submenu &&
                  menuItem.children.submenu.map((menuSubItem, index) => (
                    <div key={index}>
                      <Link to={"/" + menuSubItem.document.slug.current}>
                        {menuSubItem.document.title}
                      </Link>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </header>
      )}
    />
  )
}
