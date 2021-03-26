import React from "react"
import { graphql } from "gatsby"
import BlockContent from '@sanity/block-content-to-react'

// const serializers = {
//   types: {
//     image: props => (
//       <div>{console.log(props)}</div>
//     )
//   }
// }

const Page = ({ data }) => {
  const node = data.page
  console.log(node.body)
  return (
    <div>
      <h1>{node.title}</h1>
      <BlockContent blocks={node.body} />
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
      body {
        _type
        _rawChildren
        _key
        style
        children {
          text
          marks
          _type
          _key
        }
      }
    }
  }
`
