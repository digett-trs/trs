/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
// add property type value? If sanity property or drupal?

const PropertyFeaturedLarge = ({ featuredProperty }) => {
  console.log(featuredProperty)
  return (
    <div>
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
          {featuredProperty.featuredTextOverlay && (
            <div
              sx={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: "0px",
                left: "0px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <div
                sx={{
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  padding: [
                    "5px 20px 5px 20px",
                    "5px 20px 5px 20px",
                    "10px 40px 10px 100px",
                  ],
                  fontWeight: "bold",
                  fontSize: ["20px", "26px", "38px"],
                  margin: [
                    "0px 0px 0px 0px",
                    "20px 0px 0px 0px",
                    "40px 0px 0px 0px",
                  ],
                  alignSelf: "flex-start",
                  justifySelf: "flex-start",
                }}
              >
                {featuredProperty.featuredTextOverlay}
              </div>
              <div
                sx={{
                  alignSelf: "flex-end",
                  justifySelf: "flex-end",
                  width: "100%",
                  maxWidth: ["100%", "100%", "400px"],
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {featuredProperty.status && (
                  <div
                    sx={{
                      backgroundColor: "#fdcb92",
                      padding: "10px",
                      color: "black",
                      width: "100%",
                      maxWidth: "200px",
                      display: ["none", "none", "block"],
                    }}
                  >
                    {featuredProperty.status}
                  </div>
                )}
                {featuredProperty.propertyName && (
                  <div
                    sx={{
                      textAlign: "left",
                      backgroundColor: "#710e09",
                      padding: ["10px 0px 0px 0px", "15px 0px 0px 0px", "20px"],
                      width: "100%",
                    }}
                  >
                    <div
                      sx={{
                        color: "white",
                        fontSize: ["14px", "18px", "28px"],
                        padding: [
                          "0px 10px 0px 10px",
                          "0px 15px 0px 15px",
                          "0px",
                        ],
                      }}
                    >
                      {featuredProperty.propertyName}
                    </div>

                    {featuredProperty.acreage && (
                      <div
                        sx={{
                          color: "white",
                          margin: "10px 0px",
                          padding: [
                            "0px 10px 0px 10px",
                            "0px 15px 0px 15px",
                            "0px",
                          ],
                        }}
                      >
                        <span>Acreage: </span>
                        <span>{featuredProperty.acreage} +/-</span>
                      </div>
                    )}
                    <Link
                      sx={{
                        backgroundColor: "#fdcb92",
                        display: "block",
                        padding: "10px",
                        textAlign: "center",
                      }}
                      to={"/property/" + featuredProperty.slug.current}
                    >
                      VIEW RANCH DETAILS
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default PropertyFeaturedLarge
