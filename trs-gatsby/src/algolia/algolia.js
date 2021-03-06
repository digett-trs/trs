const postQuery = `{
  additionalproperties: allProperty(filter: {mlsid: {ne: "666"}}) {
    nodes{
      objectID: mlsid
      mlsid
      acreage: acreage
      county: county
      address: propertyName
      description: propertyDescription
      price: price
      updated: _updatedAt
      city: city
      state: state
      zip: zip
      slug: mlsid
      status: status
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
      strapline: strapline
      description: propertySummary
      updated: _updatedAt
      status: status
      slug: slug{
        current
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
