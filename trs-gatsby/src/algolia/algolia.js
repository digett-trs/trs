const postQuery = `{
    properties: allProperty(filter: {mlsid: {ne: "666"}}) {
      nodes{
        objectID: mlsid
        mlsid
        field_acreage
        field_county
        field_l_addressstreet
        field_l_remarks
        field_price
        field_l_updatedate
        childFile {
          childImageSharp {
            gatsbyImageData
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
    transformer: ({ data }) => data.properties.nodes,
    indexName: `additional_properties`,
  },
]

module.exports = queries
