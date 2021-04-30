/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PropertyTeaser from "../components/entity/property/propertyTeaser"

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
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <div
          sx={{
            width: "20%",
          }}
        >
          <h2>Filters</h2>
        </div>
        <div
          sx={{
            width: "calc(80% - 40px)",
          }}>
          {properties.nodes.map((property, index) => (
            <PropertyTeaser property={property} key={index}></PropertyTeaser>

          ))}
          <div className="pager-previous-container">
            {!isFirst && (
              <Link to={"/property" + prevPage} rel="prev">
                Prev
              </Link>
            )}
          </div>

          <div className="pager-container">
            {Array.from({ length: numPages }, (_, i) => (
              <Link
                className="pager-link"
                key={`pagination-number${i + 1}`}
                to={`/property${i === 0 ? "" : "/" + (i + 1)}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
          <div className="pager-next-container">
            {!isLast && (
              <Link to={"/property/" + nextPage} rel="next">
                Next
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Properties

export const propertiesQuery = graphql`
  query propertiesListQuery($skip: Int!, $limit: Int!) {
    properties: allProperty(limit: $limit, skip: $skip) {
      nodes{
        ...propertyTeaserFragment
      }
    }
  }
`
