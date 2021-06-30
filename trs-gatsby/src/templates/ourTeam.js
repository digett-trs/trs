/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import TeamTeaser from "../components/entity/team/teamTeaser"
const OurTeam = ({ data }) => {
  const node = data.page
  return (
    <Layout>
      <div
        sx={{
          display: [
            "block",
            node.sidebar[0] ? "flex" : "block",
            node.sidebar[0] ? "flex" : "block",
          ],
          justifyContent: "space-between",
        }}
      >
        {node.sidebar[0] && (
          <div
            sx={{
              width: [
                "100%",
                node.sidebar[0] ? "175px" : "100%",
                node.sidebar[0] ? "175px" : "100%",
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
              node.sidebar[0] ? "calc(100% - 220px)" : "100%",
              node.sidebar[0] ? "calc(100% - 220px)" : "100%",
            ],
          }}
        >
          <h1>{data.page.title}</h1>
          <BlockContent blocks={data.page._rawBody} serializers={Serializers} />
          <div
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {data.ourteam.nodes.map((team, index) => (
              <TeamTeaser index={index} team={team} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default OurTeam

export const ourTeamQuery = graphql`
  query TeamPageBySlug($slug: String!) {
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
    ourteam: allSanityTeam {
      nodes {
        slug {
          current
        }
        teamPosition
        teamFirstName
        teamLastName
        teamEmail
        teamPhoto {
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
  }
`
