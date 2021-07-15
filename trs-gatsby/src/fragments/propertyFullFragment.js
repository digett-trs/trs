import { graphql } from "gatsby"

export const propertyFullFragment = graphql`
  fragment propertyFullFragment on property {
    mlsid
    id
    county
    propertyDescription
    childrenFile {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
