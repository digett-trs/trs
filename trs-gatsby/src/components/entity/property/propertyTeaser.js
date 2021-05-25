/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Favorite from "../property/favorite"
const PropertyTeaser = ({ property }) => {
  console.log(property)
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
        {property.image.asset && (
          <GatsbyImage
            sx={{
              maxWidth: "100%",
              height: "auto",
            }}
            image={property.image.asset.gatsbyImageData}
            width={600}
            aspectRatio={4 / 3}
          />
        )}
        {property.image.childImageSharp && (
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
        <Link to={"/property/" + property.mlsid}>View Ranch Details</Link>
      </div>
      <div
        sx={{
          width: ["calc(100%)", "calc(55% - 40px)", "calc(60% - 40px)"],
        }}
      >
        <h1>{property.mlsid}</h1>
        <Favorite property={property}>Add to Favorites</Favorite>
        <div>
          <strong>County:</strong>
          {property.county.countyName && property.county.countyName}
        </div>
        <div>
          <strong>Price:</strong>
          {property.price}
        </div>
        <div>
          <strong>Acres:</strong>
          {property.field_acreage}
        </div>
        <div>
          <strong>Description:</strong>
          {property.field_l_remarks}
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
