import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import { Field, jsx } from "theme-ui"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import Img from "gatsby-image"

const ReturnImage = ({ image }) => {
  if (image.asset) {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        image={image.asset.gatsbyImageData}
        width={600}
        aspectRatio={4 / 2}
      />
    )
  } else {
    return (
      <GatsbyImage
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        image={image.childImageSharp.gatsbyImageData}
        width={600}
        aspectRatio={4 / 2}
      />
    )
  }
}
const ReturnCounty = ({ county }) => {
  if (county.countyName) {
    return county.countyName
  } else {
    return county
  }
}
const Property = ({ data }) => {
  // const node = data.property
  // const images = node.childrenFile
  if (data.property) {
    var node = data.property
    var images = node.childrenFile
    var county = node.county
  } else {
    var node = data.ourproperty
    var images = node.propertyImages
    var county = node.ourcounty
  }
  return (
    <Layout>
      <div>
        <h1>{node.mlsid}</h1>
        <Carousel autoPlay interval="5000" transitionTime="1000">
          {images.map((image, index) => (
            <ReturnImage image={image}></ReturnImage>
          ))}
        </Carousel>
        <div>
          <strong>County:</strong>
          {county}
        </div>
        <div>
          <strong>Price:</strong>
          {node.price}
        </div>
        <div>
          <strong>Acres:</strong>
          {node.acreage}
        </div>
        <div>
          <strong>Description:</strong>
        </div>
        <div>
          <strong>MLSID:</strong>
          {node.mlsid}
        </div>
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
    ourproperty: sanityProperty(mlsid: { eq: $mlsid }) {
      ...ourPropertyFullFragment
    }
  }
`
