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
