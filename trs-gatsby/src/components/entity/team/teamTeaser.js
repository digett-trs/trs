/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const TeamTeaser = ({ team }) => {
  console.log(team)
  return (
    <div
      sx={{
        border: "thin solid gray",
        backgroundColor: "lightgray",
        padding: "20px",
        width: "calc(100% / 3 - 15px)",
        marginBottom: "20px",
        boxSizing: "border-box",
      }}
    >
      {team.teamPhoto && (
        <GatsbyImage
          sx={{
            maxWidth: "100%",
            height: "auto",
          }}
          image={team.teamPhoto.asset.gatsbyImageData}
          width={600}
          aspectRatio={4 / 3}
        />
      )}
      <h3>
        {team.teamFirstName} {team.teamLastName}
      </h3>
      <div>{team.teamPosition}</div>
      <Link
        sx={{
          display: "block",
        }}
        to={
          "/contact-us?team=" +
          team.teamFirstName +
          "&lname=" +
          team.teamLastName
        }
      >
        Email {team.teamFirstName}
      </Link>
      <Link
        sx={{
          display: "block",
        }}
        to={"/our-team/" + team.slug.current}
      >
        More about {team.teamFirstName}
      </Link>
    </div>
  )
}
export default TeamTeaser
