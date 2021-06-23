import { graphql } from "gatsby"

export const propertyTeaserFragment = graphql`
  fragment propertyTeaserFragment on property {
    mlsid
    id
    field_acreage
    field_county
    field_l_remarks
    field_price
    strapline
    city
    state
    zip
    childrenFile {
      childImageSharp {
        fluid(maxWidth: 600, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
