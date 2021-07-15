import { graphql } from "gatsby"

export const propertyFullFragment = graphql`
  fragment propertyFullFragment on property {
    mlsid: String
    id: String
    acreage: Int
    county: String
    propertyDescription: String
    price: Int
    childrenFile {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
