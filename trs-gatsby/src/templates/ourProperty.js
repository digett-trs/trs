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
const Property = ({ data }) => {
  const node = data.property
  console.log(node)
  return (
    <Layout>
      <div>
        <h2>test</h2>
      </div>
    </Layout>
  )
}
export default Property

export const postQuery = graphql`
  query OurPropertyBySlug($id: String!) {
    property: sanityProperty(id: { eq: $id }) {
      ...ourPropertyFullFragment
    }
  }
`
