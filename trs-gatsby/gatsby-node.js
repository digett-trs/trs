const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
    {
      page: allSanityPage {
        nodes {
          slug {
            current
          }
        }
      }
      property: allProperty {
        nodes {
          id
          MST_MLS_NUMBER
        }
      }
    }
  `)
  const pageTemplate = path.resolve("src/templates/page.js")
  pages.data.page.nodes.forEach(node => {
    if (node.slug.current == "home") {
      createPage({
        path: `/`,
        component: pageTemplate,
        context: {
          slug: node.slug.current,
        },
      })
    } else {
      createPage({
        path: `/${node.slug.current}`,
        component: pageTemplate,
        context: {
          slug: node.slug.current,
        },
      })
    }
  })
  const propertyTemplate = path.resolve("src/templates/property.js")
  pages.data.property.nodes.forEach(node => {
    createPage({
      path: `/property/${node.MST_MLS_NUMBER}`,
      component: propertyTemplate,
      context: {
        id: node.id,
      },
    })
  })
}
