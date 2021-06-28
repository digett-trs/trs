/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Serializers from "../components/serializers/serializers"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
const Team = ({ data }) => {
  console.log(data)
  return (
    <Layout>
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

      <BlockContent blocks={data.team._rawTeamBio} serializers={Serializers} />
      <div>{"Connect With " + data.team.teamFirstName}</div>
      <a href={"mailto:" + data.team.teamEmail}>
        Email {data.team.teamFirstName}
      </a>
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
  }
`
