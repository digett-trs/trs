import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import { jsx } from "theme-ui"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
const Property = ({ data }) => {
  const node = data.property
  console.log(node)
  const images = node.childrenFile
  return (
    <Layout>
      <div>
        <h1>{node.mlsid}</h1>
        {images.map((image, index) => (
          <div>
            <GatsbyImage image={image.childImageSharp.gatsbyImageData} />
          </div>
        ))}
      </div>
    </Layout>
  )
}
export default Property

export const postQuery = graphql`
  query PropertyBySlug($id: String!) {
    property: property(id: { eq: $id }) {
      mlsid
      childrenFile {
        childImageSharp {
          gatsbyImageData(
            width: 600
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`