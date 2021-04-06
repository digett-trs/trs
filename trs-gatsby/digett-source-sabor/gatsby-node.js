const { createFileNodeFromBuffer } = require(`gatsby-source-filesystem`)
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
var clientSettings = {
  loginUrl: "http://sabor-rets.connectmls.com/rets/server/login",
  username: process.env.RETS_SABOR_USER,
  password: process.env.RETS_SABOR_PW,
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
    createNode({
      ...property,
      id: createNodeId(`Property-${property.L_ListingID}`),
      parent: null,
      children: property.imageids,
      internal: {
        type: "PropertySabor",
        content: "content",
        contentDigest: "content digest",
      },
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
          "FR",
          "(L_Status_N=|ACT,NEW),(L_AskingPrice=750000+)",
          {
            limit: 5,
            offset: 0,
          }
        )
        .then(function (searchData) {
          searchData.results.forEach((property, index, array) => {
            var imageIds = []
            client.objects
              .getAllObjects("Property", "Photo", property.L_ListingID)
              .then(async function (photoResults) {
                if (photoResults.objects) {
                  for (var i = 0; i < photoResults.objects.length; i++) {
                    if (photoResults.objects[i].error) {
                      console.log(
                        "      Error2: " + photoResults.objects[i].error
                      )
                    } else {
                      if (photoResults.objects[i].data) {
                        var imageNode = await createFileNodeFromBuffer({
                          buffer: photoResults.objects[i].data,
                          getCache: getCache,
                          createNode: createNode,
                          createNodeId: createNodeId,
                        })
                        imageIds.push(imageNode.id)
                      }
                    }
                    if (i === photoResults.objects.length - 1) {
                      property.imageids = imageIds
                      properties.push(property)
                    }
                  }
                }
              })
              .then(function () {
                if (index === array.length - 1) resolve(properties)
              })
          })
        })
    })
  })
}


