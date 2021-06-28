/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import Layout from "../components/layout"
import TeamTeaser from "../components/entity/team/teamTeaser"
const OurTeam = ({ data }) => {
  console.log(data)
  const node = data.page
  return (
    <Layout>
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
