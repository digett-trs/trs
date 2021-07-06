/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")
// const fetch = require(`node-fetch`)
// exports.sourceNodes = async ({
//   actions: { createNode },
//   createContentDigest,
// }) => {
//   // get data from GitHub API at build time
//   const result = await fetch(`https://mls-api-trfs.pantheonsite.io/rest/mls`)
//   const resultData = await result.json()
//   // create node for build time data example in the docs
//   //   createNode({
//   //     // nameWithOwner and url are arbitrary fields from the data
//   //     nameWithOwner: resultData.full_name,
//   //     url: resultData.html_url,
//   //     // required fields
//   //     id: `example-build-time-data`,
//   //     parent: null,
//   //     children: [],
//   //     internal: {
//   //       type: `Example`,
//   //       contentDigest: createContentDigest(resultData),
//   //     },
//   //   })
//   console.log("befor data")
//   console.log(resultData)
// }
