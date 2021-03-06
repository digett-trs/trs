/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
const Team = ({ data }) => {
  const sidebar = data.sidebar
  console.log(sidebar)
  return (
    <Layout>
      <div
        sx={{
          display: [
            "block",
            sidebar ? "flex" : "block",
            sidebar ? "flex" : "block",
          ],
          justifyContent: "space-between",
        }}
      >
        {sidebar && (
          <div
            sx={{
              width: [
                "100%",
                sidebar ? "175px" : "100%",
                sidebar ? "175px" : "100%",
              ],
            }}
          >
            <BlockContent
              blocks={sidebar._rawBlockcontent}
              serializers={Serializers}
            />
          </div>
        )}
        <div
          sx={{
            width: [
              "100%",
              sidebar ? "calc(100% - 220px)" : "100%",
              sidebar ? "calc(100% - 220px)" : "100%",
            ],
          }}
        >
          <h1>
            {data.team.teamFirstName} {data.team.teamLastName}
          </h1>
          {data.team.teamPhoto && (
            <GatsbyImage
              sx={{
                maxWidth: "100%",
                height: "auto",
              }}
              image={data.team.teamPhoto.asset.gatsbyImageData}
              width={600}
              aspectRatio={4 / 3}
            />
          )}
          <div>{data.team.teamPosition}</div>

          <BlockContent
            blocks={data.team._rawTeamBio}
            serializers={Serializers}
          />
          <div>{"Connect With " + data.team.teamFirstName}</div>
          <Link
            sx={{
              display: "block",
            }}
            to={
              "/contact-us?team=" +
              data.team.teamFirstName +
              "&lname=" +
              data.team.teamLastName
            }
          >
            Email {data.team.teamFirstName}
          </Link>
        </div>
      </div>
    </Layout>
  )
}
export default Team

export const TeamQuery = graphql`
  query TeamBySlug($slug: String!) {
    team: sanityTeam(slug: { current: { eq: $slug } }) {
      slug {
        current
      }
      teamPosition
      teamFirstName
      teamLastName
      teamEmail
      _rawTeamBio(resolveReferences: { maxDepth: 10 })
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
    sidebar: sanityBlockcontent(blockName: { eq: "Team Sidebar" }) {
      _rawBlockcontent(resolveReferences: { maxDepth: 10 })
    }
  }
`
