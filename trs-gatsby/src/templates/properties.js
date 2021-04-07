import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { jsx } from "theme-ui"

const Properties = props => {
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  const properties = props.data.properties
  return (
    <Layout>
      <h1>All Properties</h1>
      <ul>
        {properties.nodes.map((property, index) => (
          <li>
            <Link to={"/property/" + property.mlsid}>{property.mlsid}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Properties

export const propertiesQuery = graphql`
  query propertiesListQuery($skip: Int!, $limit: Int!) {
    properties: allProperty(limit: $limit, skip: $skip) {
      nodes {
        id
        mlsid
      }
    }
  }
`
