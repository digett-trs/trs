import * as React from "react"
import Image from "./image"
import { Link } from "gatsby"
const sanityConfig = { projectId: "5b1rgyjn", dataset: "production" }
const Serializers = {
  container: ({ children }) => <React.Fragment>{children}</React.Fragment>,
  types: {
    image: Image,
  },
  marks: {
    internalLink: ({ mark, children }) => {
      var href = ""
      if (mark.reference._type == "team") {
        href = `/our-team/${mark.reference.slug.current}`
      } else {
        href = `/${mark.reference.slug.current}`
      }
      return (
        <Link activeStyle={{ textDecoration: "underline" }} to={href}>
          {children}
        </Link>
      )
    },
  },
}

export default Serializers
