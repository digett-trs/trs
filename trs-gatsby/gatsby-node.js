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
      property: allInternalPosts {
        nodes {
          mlsid
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
      path: `/property/${node.mlsid}`,
      component: propertyTemplate,
      context: {
        mlsid: node.mlsid,
      },
    })
  })
  const postsPerPage = 6
  const numPages = Math.ceil(pages.data.property.nodes.length / postsPerPage)
  const insightsTemplate = path.resolve("src/templates/properties.js")
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/property` : `/property/${i + 1}`,
      component: insightsTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

exports.sourceNodes = ({ actions, getNodesByType }) => {
  const { touchNode } = actions
  // touch nodes to ensure they aren't garbage collected
  ;[...getNodesByType(`internal__posts`)].forEach(node =>
    touchNode({ nodeId: node.id })
  )
}

exports.onCreateNode = async ({ node, actions, createNodeId, getCache }) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === `internal__posts`) {
    if (node.field_images) {
      try {
        const imageIds = await createImages(
          createNode,
          node,
          actions,
          createNodeId,
          getCache
        )

        console.log(imageIds)
        node.children = imageIds
        console.log(node.mlsid)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

async function createImages(createNode, node, actions, createNodeId, getCache) {
  var imageIds = []
  await Promise.all(
    node.field_images.map(async image => {
      let fileNode
      try {
        fileNode = await createRemoteFileNode({
          url: image,
          parentNodeId: node.id,
          getCache,
          createNode,
          createNodeId,
        })
        if (fileNode) {
          imageIds.push(fileNode.id)
        }
      } catch (e) {
        // Ignore
      }
    })
  )
  return imageIds
}
