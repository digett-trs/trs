import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import sanityConfig from "../../sanityConfig"
const Image = ({ node }) => {
  const gatsbyImageData = getGatsbyImageData(
    node,
    { maxWidth: 675 },
    sanityConfig
  )
  return <GatsbyImage image={gatsbyImageData} alt={node.alt ? node.alt : ""} />
}

export default Image
