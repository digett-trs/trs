import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import { Field, jsx } from "theme-ui"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Img from "gatsby-image"
const Property = ({ data }) => {
  const node = data.property
  const images = node.childrenFile
  console.log(node)
  return (
    <Layout>
      <div>
        <h1>{node.mlsid}</h1>
        <Carousel autoPlay interval="5000" transitionTime="1000">
          {images.map((image, index) => (
            <Img fluid={image.childImageSharp.fluid} />
          ))}
        </Carousel>
        <div><strong>County:</strong>{node.field_county}</div>
        <div><strong>Price:</strong>{node.field_price}</div>
        <div><strong>Acres:</strong>{node.field_acreage}</div>
        <div><strong>Description:</strong>{node.field_l_remarks}</div>
        <div><strong>MLSID:</strong>{node.mlsid}</div>
      </div>
    </Layout>
  )
}
export default Property

export const postQuery = graphql`
  query PropertyBySlug($mlsid: String!) {
    property: property(mlsid: { eq: $mlsid }) {
      ...propertyFullFragment
    }
  }
`
