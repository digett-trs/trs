/** @jsx jsx */
import { jsx } from "theme-ui"
// import { Link } from "gatsby"
import { Link } from "gatsby-plugin-modal-routing-3"
import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Favorite from "../property/favorite"
import { render } from "react-dom"
// add property type value? If sanity property or drupal?
const SlugPath = ({ slug }) => {
  if (slug) {
    if (slug.current) {
      return (
        <Link
          state={{
            noScroll: true,
          }}
          asModal
          to={"/property/" + slug.current}
        >
          View Ranch Details
        </Link>
      )
    } else {
      return (
        <Link
          state={{
            noScroll: true,
          }}
          asModal
          to={"/property/" + slug}
        >
          View Ranch Details
        </Link>
      )
    }
  }
  return ""
}
const PropertyTeaser = ({ property }) => {
  console.log(property)
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: ["column", "column", "row"],
        justifyContent: "space-between",
        borderBottom: "thin solid gray",
        paddingBottom: 4,
        marginBottom: 4,
        zIndex: "1",
        position: "relative",
      }}
    >
      <div
        sx={{
          width: ["100%", "100%", "40%"],
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
          width: ["calc(100%)", "calc(100%)", "calc(60% - 40px)"],
        }}
      >
        <h1>{property.address}</h1>
        {property.strapline && <div>{property.strapline}</div>}
        {property.zip && (
          <div>
            <span>{property.city}</span>
            <span> {property.state}, </span>
            <span>{property.zip}</span>
          </div>
        )}
        <Favorite
          sx={{
            display: "none",
          }}
          property={property}
        >
          Add to Favorites
        </Favorite>
        <div>
          <strong>County:</strong>
          {property.sanitycounty && property.sanitycounty.countyName}
          {property.county && property.county}
        </div>
        <div>
          <strong>Price:</strong>
          {property.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          })}
        </div>
        <div>
          <strong>Acres:</strong>
          {property.acreage
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          +/-
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
