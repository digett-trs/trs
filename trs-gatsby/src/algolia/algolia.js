const postQuery = `{
  additionalproperties: allProperty(filter: {mlsid: {ne: "666"}}) {
    nodes{
      objectID: mlsid
      mlsid
      acreage: field_acreage
      county: field_county
      address: field_l_addressstreet
      description: field_l_remarks
      price: field_price
      updated: field_l_updatedate
      image: childFile {
        childImageSharp {
          gatsbyImageData(
            width: 600
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            layout: CONSTRAINED
          )
        }
      }
    }
  }
  ourproperties: allSanityProperty{
    nodes{
      objectID: mlsid
      mlsid: mlsid
      address: propertyName
      county: ourcounty
      price: price
      acreage: acreage
      description: propertySummary
      updated: _updatedAt
      sanityimage: propertyFeaturedImage {
        asset {
          gatsbyImageData(
            width: 600
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            layout: CONSTRAINED
          )
        }
      }
    }
  }
}`

// const flatten = arr =>
//   arr.map(({ node: { mlsid, ...rest } }) => ({
//     ...mlsid,
//     ...rest,
//   }))

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => data.additionalproperties.nodes,
    indexName: `additional_properties`,
  },
  {
    query: postQuery,
    transformer: ({ data }) => data.ourproperties.nodes,
    indexName: `additional_properties`,
  },
]

module.exports = queries
