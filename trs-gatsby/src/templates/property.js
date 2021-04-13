import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import { jsx } from "theme-ui"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Img from "gatsby-image"

const Property = ({ data }) => {
  const node = data.property
  const images = node.childrenFile
  console.log(node)
  return (
    <Layout>
      <div>
        <h1>{node.mlsid}</h1>
        {images.map((image, index) => (
          <div>
            <Img fluid={image.childImageSharp.fluid} />

            {/* <GatsbyImage image={image.childImageSharp.gatsbyImageData} /> */}
          </div>
        ))}
      </div>
    </Layout>
  )
}
export default Property

export const postQuery = graphql`
  query PropertyBySlug($mlsid: String!) {
    property: property(mlsid: { eq: $mlsid }) {
      mlsid
      childrenFile {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  }
`
