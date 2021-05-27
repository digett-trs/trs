/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Favorite from "../property/favorite"
import { render } from "react-dom"
const SlugPath = ({ slug }) => {
  if (slug.current) {
    return <Link to={"/property/" + slug.current}>View Ranch Details</Link>
  } else {
    return <Link to={"/property/" + slug}>View Ranch Details</Link>
  }
}
const PropertyTeaser = ({ property }) => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: ["column", "row", "row"],
        justifyContent: "space-between",
        borderBottom: "thin solid gray",
        paddingBottom: 4,
        marginBottom: 4,
      }}
    >
      <div
        sx={{
          width: ["100%", "45%", "40%"],
        }}
      >
        {property.sanityimage && (
          <GatsbyImage
            sx={{
              maxWidth: "100%",
              height: "auto",
            }}
            image={property.sanityimage.asset.gatsbyImageData}
            width={600}
            aspectRatio={4 / 2}
          />
        )}
        {property.image && (
          <GatsbyImage
            sx={{
              maxWidth: "100%",
              height: "auto",
            }}
            image={property.image.childImageSharp.gatsbyImageData}
            width={600}
            aspectRatio={4 / 3}
          />
        )}
        <SlugPath slug={property.slug}></SlugPath>
      </div>
      <div
        sx={{
          width: ["calc(100%)", "calc(55% - 40px)", "calc(60% - 40px)"],
        }}
      >
        <h1>{property.address}</h1>
        <Favorite property={property}>Add to Favorites</Favorite>
        <div>
          <strong>County:</strong>
          {property.sanitycounty && property.sanitycounty.countyName}
          {property.county && property.county}
        </div>
        <div>
          <strong>Price:</strong>
          {property.price}
        </div>
        <div>
          <strong>Acres:</strong>
          {property.acreage}
        </div>
        <div>
          <strong>Description:</strong>
          {property.description}
        </div>
        <div>
          <strong>MLSID:</strong>
          {property.mlsid}
        </div>
      </div>
    </div>
  )
}
export default PropertyTeaser
