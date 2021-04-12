const { createFileNodeFromBuffer } = require(`gatsby-source-filesystem`)
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
var rets = require("rets-client")
var fs = require("fs")
exports.sourceNodes = async ({ actions, createNodeId, getCache }, config) => {
  const { createNode } = actions
  const kerrvilledata = await fetchPropertiesKerrville(
    createNode,
    createNodeId,
    getCache
  )

  // const sabordata = await fetchPropertiesSabor(
  //   createNode,
  //   createNodeId,
  //   getCache
  // )
  const idxdata = await fetchPropertiesIdx(createNode, createNodeId, getCache)

  idxdata.forEach(property => {
    createNode({
      id: createNodeId(`Property-${property.MST_MLS_NUMBER}`),
      parent: null,
      children: property.imageids,
      internal: {
        type: "property",
        content: "content",
        contentDigest: "content digest",
      },
      mlsid: property.MST_MLS_NUMBER,
    })
  })
  kerrvilledata.forEach(property => {
    createNode({
      id: createNodeId(`Property-${property.MST_MLS_NUMBER}`),
      parent: null,
      children: property.imageids,
      internal: {
        type: "property",
        content: "content",
        contentDigest: "content digest",
      },
      mlsid: property.MST_MLS_NUMBER,
    })
  })
  // sabordata.forEach(property => {
  //   createNode({
  //     id: createNodeId(`Property-${property.L_ListingID}`),
  //     parent: null,
  //     children: property.imageids,
  //     internal: {
  //       type: "property",
  //       content: "content",
  //       contentDigest: "content digest",
  //     },
  //     mlsid: property.L_ListingID,
  //   })
  // })

  return
}

function fetchPropertiesSabor(createNode, createNodeId, getCache, properties) {
  console.log("fetch sab3")
  const clientSettings = {
    loginUrl: "http://sabor-rets.connectmls.com/rets/server/login",
    username: process.env.RETS_SABOR_USER,
    password: process.env.RETS_SABOR_PW,
    version: "RETS/1.7.2",
    userAgent: "RETS node-client/4.x",
    method: "GET", // this is the default, or for some servers you may want 'POST'
  }
  return new Promise(resolve => {
    rets.getAutoLogoutClient(clientSettings, function (client) {
      return client.search
        .query(
          "Property",
          "FR",
          "(L_Status_N=|ACT,NEW),(L_AskingPrice=750000+)"
        )
        .then(async function (searchData) {
          console.log(
            "Sabor property count from query: " + searchData.results.length
          )
          const props = await getPropsSabor(
            client,
            searchData,
            createNode,
            createNodeId,
            getCache,
            properties
          )
          console.log(props.length)
          resolve(props)
        })
    })
  })
}
async function getPropsSabor(
  client,
  searchData,
  createNode,
  createNodeId,
  getCache
) {
  var properties = []
  var count = 0
  await Promise.all(
    searchData.results.map(async property => {
      count++
      const myobjects = await getObjectsSabor(
        client,
        property,
        createNode,
        createNodeId,
        getCache,
        count
      )
      property.imageids = myobjects
      properties.push(property)
    })
  )
  return properties
}
function getObjectsSabor(
  client,
  property,
  createNode,
  createNodeId,
  getCache,
  count
) {
  var imageIds = []
  return new Promise(resolve => {
    client.objects
      .getAllObjects("Property", "Photo", property.L_ListingID)
      .then(async function (photoResults) {
        if (photoResults.objects) {
          console.log(
            "Sabor count: " +
              count +
              " image count for mlsid: " +
              property.L_ListingID +
              "=" +
              photoResults.objects.length
          )
          for (var i = 0; i < photoResults.objects.length; i++) {
            if (photoResults.objects[i].error) {
              console.log("      Error2: " + photoResults.objects[i].error)
            } else {
              if (photoResults.objects[i].data) {
                const imageNode = await createFileNodeFromBuffer({
                  buffer: photoResults.objects[i].data,
                  getCache: getCache,
                  createNode: createNode,
                  createNodeId: createNodeId,
                })
                imageIds.push(imageNode.id)
              }
              if (i === photoResults.objects.length - 1) {
                resolve(imageIds)
              }
            }
          }
        } else {
          resolve(imageIds)
        }
      })
  })
}

function fetchPropertiesKerrville(createNode, createNodeId, getCache) {
  console.log("fetch kerrville")
  const clientSettings = {
    loginUrl: "http://rets2.navicamls.net/login.aspx",
    username: process.env.RETS_KERRVILLE_USER,
    password: process.env.RETS_KERRVILLE_PW,
    version: "RETS/1.7.2",
    userAgent: "RETS node-client/4.x",
    method: "GET", // this is the default, or for some servers you may want 'POST'
  }
  return new Promise(resolve => {
    rets.getAutoLogoutClient(clientSettings, function (client) {
      return client.search
        .query(
          "Property",
          "FARM",
          "(List_Price=750000+),(rets_status=Active)",
          {
            limit: 2,
          }
        )
        .then(async function (searchData) {
          console.log(
            "Kerrville property count from query: " + searchData.results.length
          )
          const props = await getPropsNavi(
            client,
            searchData,
            createNode,
            createNodeId,
            getCache
          )
          resolve(props)
        })
    })
  })
}
function fetchPropertiesIdx(createNode, createNodeId, getCache) {
  console.log("fetch idx")
  const clientSettings = {
    loginUrl: "http://rets2.navicamls.net/login.aspx",
    username: process.env.RETS_IDX_USER,
    password: process.env.RETS_IDX_PW,
    version: "RETS/1.7.2",
    userAgent: "RETS node-client/4.x",
    method: "GET", // this is the default, or for some servers you may want 'POST'
  }
  return new Promise(resolve => {
    rets.getAutoLogoutClient(clientSettings, function (client) {
      return client.search
        .query(
          "Property",
          "LAND",
          "(List_Price=750000+),(rets_status=Active)",
          {
            limit: 2,
          }
        )
        .then(async function (searchData) {
          console.log(
            "IDX property count from query: " + searchData.results.length
          )
          const props = await getPropsNavi(
            client,
            searchData,
            createNode,
            createNodeId,
            getCache
          )
          resolve(props)
        })
    })
  })
}
async function getPropsNavi(
  client,
  searchData,
  createNode,
  createNodeId,
  getCache
) {
  var properties = []
  await Promise.all(
    searchData.results.map(async property => {
      const myobjects = await getObjectsNavi(
        client,
        property,
        createNode,
        createNodeId,
        getCache
      )
      property.imageids = myobjects
      properties.push(property)
    })
  )
  return properties
}
function getObjectsNavi(client, property, createNode, createNodeId, getCache) {
  var imageIds = []
  return client.objects
    .getAllObjects("Property", "Photo", property.MST_MLS_NUMBER)
    .then(async function (photoResults) {
      if (photoResults.objects) {
        console.log(
          "IDX image count for mlsid: " +
            property.MST_MLS_NUMBER +
            "=" +
            photoResults.objects.length
        )
        for (var i = 0; i < photoResults.objects.length; i++) {
          if (photoResults.objects[i].error) {
            console.log("      Error2: " + photoResults.objects[i].error)
          } else {
            if (photoResults.objects[i].data) {
              const imageNode = await createFileNodeFromBuffer({
                buffer: photoResults.objects[i].data,
                getCache: getCache,
                createNode: createNode,
                createNodeId: createNodeId,
              })
              imageIds.push(imageNode.id)
            }
            if (i === photoResults.objects.length - 1) {
              return imageIds
            }
          }
        }
      } else {
        return null
      }
    })
}
