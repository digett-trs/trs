import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import { jsx } from "theme-ui"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Img from "gatsby-image"
<<<<<<< HEAD
const Property = ({ data }) => {
  const node = data.property
  const images = node.localFile
  console.log(images)
=======

const Property = ({ data }) => {
  const node = data.property
  const images = node.childrenFile
>>>>>>> 3188aea850769c8cfa6d0a1e8f9f3a69b482f70a
  return (
    <Layout>
      <div>
        <h1>{node.mlsid}</h1>
        {images.map((image, index) => (
          <div>
<<<<<<< HEAD
            <Img fluid={image.childrenImageSharp[0].fluid} />
=======
            <Img fluid={image.childImageSharp.fluid} />

            {/* <GatsbyImage image={image.childImageSharp.gatsbyImageData} /> */}
>>>>>>> 3188aea850769c8cfa6d0a1e8f9f3a69b482f70a
          </div>
        ))}
      </div>
    </Layout>
  )
}
export default Property

export const postQuery = graphql`
  query PropertyBySlug($mlsid: String!) {
    property: internalPosts(mlsid: { eq: $mlsid }) {
      mlsid
<<<<<<< HEAD
      localFile {
        childrenImageSharp {
=======
      childrenFile {
        childImageSharp {
>>>>>>> 3188aea850769c8cfa6d0a1e8f9f3a69b482f70a
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
