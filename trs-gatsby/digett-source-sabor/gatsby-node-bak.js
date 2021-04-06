const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { createFileNodeFromBuffer } = require(`gatsby-source-filesystem`)

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
var clientSettings = {
  loginUrl: "http://rets2.navicamls.net/login.aspx",
  username: process.env.RETS_IDX_USER,
  password: process.env.RETS_IDX_PW,
  version: "RETS/1.7.2",
  userAgent: "RETS node-client/4.x",
  method: "GET", // this is the default, or for some servers you may want 'POST'
}
var rets = require("rets-client")
var fs = require("fs")
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createNodeField,
  cache,
  store,
}) => {
  const { createNode } = actions
  var publicDir = require("path").join("/static/properties/idx/")
  console.log(publicDir)
  const data = await fetchProperties()

  data.forEach(property => {
    fileNodes = []

    property.imagePaths.forEach(image => {
      console.log(publicDir + image)
      // console.log(createFilePath({ node, getNode, basePath: `pages` }))
      let fileNode = createRemoteFileNode({
        url:
          "http://digitalcommunications.wp.st-andrews.ac.uk/files/2019/04/JPEG_compression_Example.jpg", // string that points to the URL of the image
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's redux store
      })
      if (fileNode) {
        console.log(fileNode.id)
        fileNodes.push(fileNode.id)
        createNode({
          ...property,
          id: createNodeId(`Property-${property.MST_MLS_NUMBER}`),
          parent: null,
          children: [],
          internal: {
            type: "Property",
            content: "content",
            contentDigest: "content digest",
          },
          imagesnow: "image please!",
          imagetester: "now",
          localFile___NODE: fileNode.id,
        })
      }
    })
  })
  // return
}
// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions
//   console.log(node.internal.type)
//   if (node.internal.type === `Property`) {
//     createNodeField({
//       node,
//       name: `slug`,
//       value: "testslugger",
//     })
//   }
// }

function fetchProperties() {
  console.log("fetch-function")
  var properties = []
  return new Promise(resolve => {
    rets.getAutoLogoutClient(clientSettings, function (client) {
      return client.search
        .query(
          "Property",
          "LAND",
          "(List_Price=750000+),(rets_status=Active)",
          {
            limit: 1,
            offset: 0,
          }
        )
        .then(function (searchData) {
          searchData.results.forEach((node, index, array) => {
            var imagePaths = []
            client.objects
              .getAllObjects("Property", "Photo", node.MST_MLS_NUMBER)
              .then(function (photoResults) {
                for (var i = 0; i < photoResults.objects.length; i++) {
                  if (photoResults.objects[i].error) {
                    console.log(
                      "      Error2: " + photoResults.objects[i].error
                    )
                  } else {
                    if (photoResults.objects[i].data) {
                      var dir = `./static/properties/idx/${node.MST_MLS_NUMBER}`
                      if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir)
                      }
                      fs.writeFileSync(
                        `./static/properties/idx/${node.MST_MLS_NUMBER}/` +
                          node.MST_MLS_NUMBER +
                          "-" +
                          (i + 1) +
                          "." +
                          photoResults.objects[i].headerInfo.contentType.match(
                            /\w+\/(\w+)/i
                          )[1],
                        photoResults.objects[i].data
                      )
                      imagePaths.push(
                        `${node.MST_MLS_NUMBER}/` +
                          node.MST_MLS_NUMBER +
                          "-" +
                          (i + 1) +
                          "." +
                          photoResults.objects[i].headerInfo.contentType.match(
                            /\w+\/(\w+)/i
                          )[1]
                      )
                    }
                  }
                  if (i === photoResults.objects.length - 1) {
                    node.imagePaths = imagePaths
                    properties.push(node)
                  }
                }
              })
              .then(function () {
                console.log(index)
                console.log(array.length)
                if (index === array.length - 1) resolve(properties)
              })
          })
        })
    })
  })
}
