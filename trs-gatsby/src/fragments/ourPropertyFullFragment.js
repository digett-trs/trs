import { graphql } from "gatsby"

export const ourPropertyFullFragment = graphql`
  fragment ourPropertyFullFragment on SanityProperty {
    id
    propertyName
    price
    acreage
    mlsid
    county {
      countyName
      _rawCountyDescrition(resolveReferences: { maxDepth: 10 })
    }
    ourcounty
    propertyAerialMap {
      asset {
        url
      }
    }
    propertyBrochureFile {
      asset {
        url
      }
    }
    propertyContacts {
      teamFirstName
      teamLastName
      teamEmail
    }
    _rawPropertyDescrition(resolveReferences: { maxDepth: 10 })
    propertyFeaturedImage {
      asset {
        gatsbyImageData
      }
    }
    propertyImages {
      asset {
        gatsbyImageData
      }
    }
    _rawPropertyImprovements(resolveReferences: { maxDepth: 10 })
    propertyInteractiveLocationMap
    _rawPropertyLand(resolveReferences: { maxDepth: 10 })
    _rawPropertyLocation(resolveReferences: { maxDepth: 10 })
    propertySummary
    propertyTopographicMap {
      asset {
        url
      }
    }
    propertyType {
      propertyTypeName
    }
    _rawPropertyWater(resolveReferences: { maxDepth: 10 })
    _rawPropertyWildlife(resolveReferences: { maxDepth: 10 })
    region {
      regionName
    }
    status
    youtubeUrl
  }
`
