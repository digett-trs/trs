import React from "react"
import { graphql } from "gatsby"
// Sort and display the different slice options

const Page = ({ data }) => {
  const node = data.page
  return (
    <div>
      <h1>{node.title}</h1>
    </div>
  )
}
export default Page

export const postQuery = graphql`
  query PageBySlug($slug: String!) {
    page: sanityPage(slug: {current:{ eq: $slug }}){
      slug{
        current
      }
      title
    }
  }
`
