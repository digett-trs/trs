/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PropertyFeaturedLarge from "../components/entity/property/propertyFeaturedLarge"
import PropertyFeaturedSmall from "../components/entity/property/propertyFeaturedSmall"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
const Page = ({ data }) => {
  const node = data.page
  console.log(node)
  return (
    <Layout>
      <div>
        <h1>{node.title}</h1>
        {node.featuredProperties && (
          <Carousel autoplay interval="5000" transitionTime="1000">
            {node.featuredProperties.map((featuredProperty, index) => (
              <PropertyFeaturedLarge
                index={index}
                featuredProperty={featuredProperty}
              ></PropertyFeaturedLarge>
            ))}
          </Carousel>
        )}
        {node.featuredProperties && (
          <div
            sx={{
              display: "flex",
              flexDirection: ["column", "column", "row"],
            }}
          >
            {node.featuredProperties.map((featuredProperty, index) => (
              <div
                index={index}
                sx={{
                  width: ["calc(100%)", "calc(100%)", "calc(100% / 5 - 20px)"],
                  marginRight: "40px",
                  marginBottom: ["20px", "20px", "0px"],
                }}
              >
                <PropertyFeaturedSmall
                  index={index}
                  featuredProperty={featuredProperty}
                ></PropertyFeaturedSmall>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
export default Page

export const postQuery = graphql`
  query Home($id: String!) {
    page: sanityHome(id: { eq: $id }) {
      title
      featuredProperties {
        propertyImages {
          asset {
            gatsbyImageData
          }
        }
        propertyName
        slug {
          current
        }
        status
        acreage
        featuredTextOverlay
      }
    }
  }
`
