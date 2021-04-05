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

exports.sourceNodes = async ({ actions, createNodeId, getCache }, config) => {
  const { createNode } = actions
  // const { conn, queries } = config
  // const { db, results } = await query(conn, queries)
  const data = await fetchProperties(createNode, createNodeId, getCache)
  data.forEach(property => {
    console.log(property)
    createNode({
      ...property,
      id: createNodeId(`Property-${property.MST_MLS_NUMBER}`),
      parent: null,
      children: property.imageids,
      internal: {
        type: "Property",
        content: "content",
        contentDigest: "content digest",
      },
      imagesnow: "image please2!",
      imagetester: "now2",
    })
  })
}

function fetchProperties(createNode, createNodeId, getCache) {
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
            limit: 5,
            offset: 0,
          }
        )
        .then(function (searchData) {
          var imageIds = []
          searchData.results.forEach((property, index, array) => {
            client.objects
              .getAllObjects("Property", "Photo", property.MST_MLS_NUMBER)
              .then(async function (photoResults) {
                for (var i = 0; i < photoResults.objects.length; i++) {
                  if (photoResults.objects[i].error) {
                    console.log(
                      "      Error2: " + photoResults.objects[i].error
                    )
                  } else {
                    if (photoResults.objects[i].data) {
                      console.log("photoloop")
                      var imageNode = await createFileNodeFromBuffer({
                        buffer: photoResults.objects[i].data,
                        getCache: getCache,
                        createNode: createNode,
                        createNodeId: createNodeId,
                      })
                      console.log(imageNode.id)
                      imageIds.push(imageNode.id)
                    }
                  }
                  if (i === photoResults.objects.length - 1) {
                    property.imageids = imageIds
                    properties.push(property)
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

function fetchImages(createNode, property) {
  console.log("fetch-images")
  console.log(property.MST_MLS_NUMBER)
  const client = rets.getAutoLogoutClient(clientSettings)
  client.objects
    .getAllObjects("Property", "Photo", property.MST_MLS_NUMBER)
    .then(function (photoResults) {
      for (var i = 0; i < photoResults.objects.length; i++) {
        if (photoResults.objects[i].error) {
          console.log("      Error2: " + photoResults.objects[i].error)
        } else {
          if (photoResults.objects[i].data) {
            console.log(photoResults.objects[i])
          }
        }
      }
    })
}
