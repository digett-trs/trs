// import React from "react"
// import { graphql } from "gatsby"
// import BlockContent from "@sanity/block-content-to-react"
// import Serializers from "../components/serializers/serializers"
// import Layout from "../components/layout"
// // import { jsx } from "theme-ui"
// const Page = ({ data }) => {
//   const node = data.page

//   return (
//     <Layout>
//       <div>
//         <h1>{node.title}</h1>
//         <BlockContent blocks={node._rawBody} serializers={Serializers} />
//       </div>
//     </Layout>
//   )
// }
// export default Page

// export const postQuery = graphql`
//   query PageBySlug($slug: String!) {
//     page: sanityPage(slug: { current: { eq: $slug } }) {
//       slug {
//         current
//       }
//       title
//       _rawBody(resolveReferences: { maxDepth: 10 })
//     }
//   }
// `
