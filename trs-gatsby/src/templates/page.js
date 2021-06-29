/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
const Page = ({ data }) => {
  console.log(data)
  const node = data.page
  const images = node.image
  console.log(node)
  return (
    <Layout>
      <div
        sx={{
          display: [
            "block",
            node.sidebar ? "flex" : "block",
            node.sidebar ? "flex" : "block",
          ],
          justifyContent: "space-between",
        }}
      >
        {node.sidebar && (
          <div
            sx={{
              width: [
                "100%",
                node.sidebar ? "175px" : "100%",
                node.sidebar ? "175px" : "100%",
              ],
            }}
          >
            <BlockContent
              blocks={node.sidebar[0]._rawBlockcontent}
              serializers={Serializers}
            />
          </div>
        )}
        <div
          sx={{
            width: [
              "100%",
              node.sidebar ? "calc(100% - 220px)" : "100%",
              node.sidebar ? "calc(100% - 220px)" : "100%",
            ],
          }}
        >
          <h1>{node.title}</h1>
          <BlockContent blocks={node._rawBody} serializers={Serializers} />
        </div>
      </div>
    </Layout>
  )
}
export default Page

export const postQuery = graphql`
  query PageBySlug($slug: String!) {
    page: sanityPage(slug: { current: { eq: $slug } }) {
      slug {
        current
      }
      title
      _rawBody(resolveReferences: { maxDepth: 10 })
      sidebar {
        _rawBlockcontent(resolveReferences: { maxDepth: 10 })
        blockName
      }
    }
  }
`
