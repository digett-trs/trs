const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require("path")
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const pages = await graphql(`
//     {
//       page: allSanityPage {
//         nodes {
//           slug {
//             current
//           }
//         }
//       }
//       property: allProperty {
//         nodes {
//           id
//           mlsid
//         }
//       }
//     }
//   `)
  // const pageTemplate = path.resolve("src/templates/page.js")
  // pages.data.page.nodes.forEach(node => {
  //   if (node.slug.current == "home") {
  //     createPage({
  //       path: `/`,
  //       component: pageTemplate,
  //       context: {
  //         slug: node.slug.current,
  //       },
  //     })
  //   } else {
  //     createPage({
  //       path: `/${node.slug.current}`,
  //       component: pageTemplate,
  //       context: {
  //         slug: node.slug.current,
  //       },
  //     })
  //   }
  // })
  // const propertyTemplate = path.resolve("src/templates/property.js")
  // pages.data.property.nodes.forEach(node => {
  //   createPage({
  //     path: `/property/${node.mlsid}`,
  //     component: propertyTemplate,
  //     context: {
  //       id: node.id,
  //     },
  //   })
  // })
  // const postsPerPage = 6
  // const numPages = Math.ceil(pages.data.property.nodes.length / postsPerPage)
  // const insightsTemplate = path.resolve("src/templates/properties.js")
  // Array.from({ length: numPages }).forEach((_, i) => {
  //   createPage({
  //     path: i === 0 ? `/property` : `/property/${i + 1}`,
  //     component: insightsTemplate,
  //     context: {
  //       limit: postsPerPage,
  //       skip: i * postsPerPage,
  //       numPages,
  //       currentPage: i + 1,
  //     },
  //   })
  // })
// }
