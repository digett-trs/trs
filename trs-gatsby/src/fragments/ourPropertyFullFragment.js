import { graphql } from "gatsby"

export const ourPropertyFullFragment = graphql`
  fragment ourPropertyFullFragment on SanityProperty {
    id
    propertyName
    county {
      countyName
      _rawCountyDescrition(resolveReferences: { maxDepth: 10 })
    }
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
    propertyDescrition {
      _rawChildren(resolveReferences: { maxDepth: 10 })
    }
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
    propertyImprovements {
      _rawChildren
    }
    propertyInteractiveLocationMap
    propertyLand {
      _rawChildren(resolveReferences: { maxDepth: 10 })
    }
    propertyLocation {
      _rawChildren
    }
    propertySummary
    propertyTopographicMap {
      asset {
        url
      }
    }
    propertyType {
      propertyTypeName
    }
    propertyWater {
      _rawChildren(resolveReferences: { maxDepth: 10 })
    }
    propertyWildlife {
      _rawChildren(resolveReferences: { maxDepth: 10 })
    }
    region {
      regionName
    }
    status
    youtubeUrl
  }
`
