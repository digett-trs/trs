/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
// add property type value? If sanity property or drupal?

const PropertyFeaturedSmall = ({ featuredProperty }) => {
  console.log(featuredProperty)
  return (
    <Link to={"/property/" + featuredProperty.slug.current}>
      {featuredProperty.propertyImages && (
        <div
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          <GatsbyImage
            sx={{
              maxWidth: "100%",
              height: "auto",
            }}
            image={featuredProperty.propertyImages[0].asset.gatsbyImageData}
            width={600}
            aspectRatio={4 / 3}
          />
          {featuredProperty.propertyName && (
            <div>{featuredProperty.propertyName}</div>
          )}
        </div>
      )}
    </Link>
  )
}
export default PropertyFeaturedSmall
