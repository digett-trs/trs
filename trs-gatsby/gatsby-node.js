const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
    {
      ourproperty: allSanityProperty {
        nodes {
          id
          mlsid
          slug {
            current
          }
        }
      }
      page: allSanityPage {
        nodes {
          slug {
            current
          }
        }
      }
      property: allProperty {
        nodes {
          mlsid
        }
      }
    }
  `)

  // const ourPropertyTemplate = path.resolve("src/templates/ourProperty.js")
  // pages.data.ourproperty.nodes.forEach(node => {
  //   createPage({
  //     path: `/our-property/${node.slug.current}`,
  //     component: ourPropertyTemplate,
  //     context: {
  //       id: node.id,
  //     },
  //   })
  // })
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
  pages.data.ourproperty.nodes.forEach(node => {
    createPage({
      path: `/property/${node.slug.current}`,
      component: propertyTemplate,
      context: {
        mlsid: node.mlsid,
      },
    })
  })
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
  const pageTemplate = path.resolve("src/templates/page.js")
  const additionalPropertiesTemplate = path.resolve(
    "src/templates/additionalProperties.js"
  )
  pages.data.page.nodes.forEach(node => {
    if (node.slug.current == "home") {
      createPage({
        path: `/`,
        component: pageTemplate,
        context: {
          slug: node.slug.current,
        },
      })
    }

    if (node.slug.current == "properties") {
      createPage({
        path: `/properties`,
        component: additionalPropertiesTemplate,
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
  // const additionalPropertiesTemplate = path.resolve(
  //   "src/templates/additionalProperties.js"
  // )
  // createPage({
  //   path: `/additionalproperties2`,
  //   component: additionalPropertiesTemplate,
  // })
}

exports.sourceNodes = ({ actions, getNodesByType }) => {
  const { touchNode } = actions
  // touch nodes to ensure they aren't garbage collected
  ;[...getNodesByType(`property`)].forEach(node =>
    touchNode({ nodeId: node.id })
  )
}
const toTimestamp = strDate => {
  const dt = Date.parse(strDate)
  return dt / 1000
}
exports.onCreateNode = async ({ node, actions, createNodeId, getCache }) => {
  const { createNode } = actions
  if (node.internal.type === `property`) {
    if (node.price) {
      node.price = parseInt(node.price)
    }
    if (node.pricePerAcre) {
      node.pricePerAcre = parseInt(node.pricePerAcre)
    }
    if (node._updatedAt) {
      node._updatedAt = toTimestamp(node._updatedAt)
    }
    if (node.acreage) {
      node.acreage = parseInt(node.acreage)
    }
    if (node.propertyImages) {
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
    node.propertyImages.map(async image => {
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

exports.createSchemaCustomization = ({ actions, schema, getNode }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: "SanityProperty",
      interfaces: ["Node"],
      fields: {
        ourcounty: {
          type: "String",
          resolve(source, args, context, info) {
            county = getNode(source.county._ref)
            return county.countyName
          },
        },
      },
    }),
  ])
}
