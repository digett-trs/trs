import { graphql } from "gatsby"

export const propertyFullFragment = graphql`
  fragment propertyFullFragment on property {
    mlsid
    id
    county
    propertyDescription
    price
    childrenFile {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
