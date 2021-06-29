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
      console.log(mark)
      const slug = mark.reference.slug.current
      console.log(slug)
      const href = `/${slug}`
      return <Link to={href}>{children}</Link>
    },
  },
}

export default Serializers
