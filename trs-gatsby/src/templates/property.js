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
// import BackToSearch from "../components/backToSearch"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing"
import ConditionalLayout from "../components/ConditionalLayout"
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
    var feedDescription = node.propertyDescription
  } else {
    var node = data.ourproperty
    var images = node.propertyImages
    var county = node.ourcounty
    var description = node._rawPropertyDescrition
    var contacts = node.propertyContacts
  }
  console.log(node)
  return (
    <ConditionalLayout>
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

        {node.price && (
          <div>
            <strong>Price:</strong>
            {node.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        )}
        {node.acreage && (
          <div>
            <strong>Acres:</strong>
            {node.acreage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              "+/-"}
          </div>
        )}

        {node.propertySummary && (
          <div>
            <strong>Summary:</strong>
            <div>{node.propertySummary}</div>
          </div>
        )}
        <div>
          <strong>Description:</strong>
          {description && (
            <BlockContent blocks={description} serializers={Serializers} />
          )}
          {feedDescription && feedDescription}
        </div>
        <div>
          <strong>MLSID:</strong>
          {node.mlsid}
        </div>
        {node._rawPropertyLocation && (
          <div>
            <strong>Location:</strong>
            <BlockContent
              blocks={node._rawPropertyLocation}
              serializers={Serializers}
            />
          </div>
        )}
        {node._rawPropertyLand && (
          <div>
            <strong>Land:</strong>
            <BlockContent
              blocks={node._rawPropertyLand}
              serializers={Serializers}
            />
          </div>
        )}
        {node._rawPropertyImprovements && (
          <div>
            <strong>Improvements:</strong>
            <BlockContent
              blocks={node._rawPropertyImprovements}
              serializers={Serializers}
            />
          </div>
        )}
        {node._rawPropertyWater && (
          <div>
            <strong>Water:</strong>
            <BlockContent
              blocks={node._rawPropertyWater}
              serializers={Serializers}
            />
          </div>
        )}
        {node._rawPropertyWildlife && (
          <div>
            <strong>Wildlife:</strong>
            <BlockContent
              blocks={node._rawPropertyWildlife}
              serializers={Serializers}
            />
          </div>
        )}
        {node.region && (
          <div>
            <strong>Contacts:</strong>
            {contacts.map((contact, index) => (
              <div>
                <div>{contact.teamEmail}</div>
                <div>{contact.teamFirstName}</div>
                <div>{contact.teamLastName}</div>
              </div>
            ))}
          </div>
        )}
        {node.contacts && (
          <div>
            <strong>Contacts:</strong>
            {contacts.map((contact, index) => (
              <div>
                <div>{contact.teamEmail}</div>
                <div>{contact.teamFirstName}</div>
                <div>{contact.teamLastName}</div>
              </div>
            ))}
          </div>
        )}
        {node.propertyTopographicMap && (
          <div>
            <strong>Topographic Map:</strong>
            <div
              key={`map`}
              id="___map"
              dangerouslySetInnerHTML={{
                __html: node.propertyTopographicMap,
              }}
            />
          </div>
        )}
        {node.propertyInteractiveLocationMap && (
          <div>
            <strong>Interactive Location Map:</strong>
            <div
              key={`map`}
              id="___map"
              dangerouslySetInnerHTML={{
                __html: node.propertyInteractiveLocationMap,
              }}
            />
          </div>
        )}
      </div>
    </ConditionalLayout>
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
