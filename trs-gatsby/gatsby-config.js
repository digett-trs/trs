require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const queries = require(`${__dirname}/src/algolia/algolia`)

const postType = {
  id: 1,
  mlsid: "666",
  acreage: "666",
  county: "The County",
  propertyDescription: "Lorem Ipsum Remarks",
  price: "666",
  pricePerAcre: "666 Street",
  status: "for-sale",
  zip: "666",
  state: "AK",
  propertyName: "The Name",
  propertyImages: [
    "https://mls-api-trfs.pantheonsite.io/sites/default/files/99722-1599649396-44.jpg",
    "https://mls-api-trfs.pantheonsite.io/sites/default/files/78490-1597381396-17.jpg",
  ],
}
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["ALGOLIA_ADMIN_API_KEY", "ALGOLIA_APP_ID"],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `5b1rgyjn`,
        dataset: `production`,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
        overlayDrafts: true,
        watchMode: true,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY,
        queries,
        chunkSize: 10000, // default: 1000
        enablePartialUpdates: true,
        matchFields: ["mlsid", "updated"],
      },
    },
    "gatsby-plugin-theme-ui",
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: "internal__posts",
    //     name: "localImages",
    //     imagePath: "field_images",
    //     type: "array",
    //     // ** ALL OPTIONAL BELOW HERE: **
    //   },
    // },
    require.resolve(`./source-properties`),
    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: "https://mls-api-trfs.pantheonsite.io/rest/mls",
        method: "get",
        allowCache: true,
        maxCacheDurationSeconds: 60 * 5,
        headers: {
          "Content-Type": "application/json",
        },
        name: `property`,
        verboseOutput: false,
        // Define schemaType to normalize blank values
        // example:
        schemaType: postType,
      },
    },
    {
      resolve: `gatsby-plugin-modal-routing-3`,
      options: {
        // A selector to set react-modal's app root to, default is `#___gatsby`
        // See http://reactcommunity.org/react-modal/accessibility/#app-element
        appElement: "#___gatsby",

        // Object of props that will be passed to the react-modal container
        // See http://reactcommunity.org/react-modal/#usage
        modalProps: {
          closeTimeoutMS: 500,
        },
      },
    },
    // require.resolve(`./digett-source-kerrville`),
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
