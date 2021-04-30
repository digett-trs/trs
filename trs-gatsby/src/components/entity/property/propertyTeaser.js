/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Img from "gatsby-image"
const PropertyTeaser = ({ property }) => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: ['column', 'row', 'row'],
        justifyContent: "space-between",
        borderBottom: "thin solid gray",
        paddingBottom: 4,
        marginBottom: 4,
      }}>
      <div
        sx={{
          width: ["100%", "45%", "40%"]
        }}
      >
        {property.childrenFile[0] &&
          <Img
            sx={{
              maxWidth: "100%",
              height: 'auto',
            }}
            fluid={property.childrenFile[0].childImageSharp.fluid} />
        }
        <Link to={'/property/' + property.mlsid}>View Ranch Details</Link>
      </div>
      <div
        sx={{
          width: ["calc(100%)", "calc(55% - 40px)", "calc(60% - 40px)"]
        }}
      >
        <h1>{property.mlsid}</h1>
        <div><strong>County:</strong>{property.field_county}</div>
        <div><strong>Price:</strong>{property.field_price}</div>
        <div><strong>Acres:</strong>{property.field_acreage}</div>
        <div><strong>Description:</strong>{property.field_l_remarks}</div>
        <div><strong>MLSID:</strong>{property.mlsid}</div>
      </div>
    </div>
  )
}
export default PropertyTeaser
