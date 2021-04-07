const { createFileNodeFromBuffer } = require(`gatsby-source-filesystem`)
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
var rets = require("rets-client")
var fs = require("fs")

exports.sourceNodes = async ({ actions, createNodeId, getCache }, config) => {
  const { createNode } = actions
  const idxdata = await fetchPropertiesIdx(createNode, createNodeId, getCache)
  const kerrvilledata = await fetchPropertiesKerrville(
    createNode,
    createNodeId,
    getCache
  )

  const sabordata = await fetchPropertiesSabor(
    createNode,
    createNodeId,
    getCache,
  )



  idxdata.forEach(property => {
    createNode({
      ...property,
      id: createNodeId(`Property-${property.MST_MLS_NUMBER}`),
      parent: null,
      children: property.imageids,
      internal: {
        type: "PropertyIdx",
        content: "content",
        contentDigest: "content digest",
      },
    })
  })
  kerrvilledata.forEach(property => {
    createNode({
      ...property,
      id: createNodeId(`Property-${property.MST_MLS_NUMBER}`),
      parent: null,
      children: property.imageids,
      internal: {
        type: "PropertyKerrville",
        content: "content",
        contentDigest: "content digest",
      },
    })
  })
  sabordata.forEach(property => {
    createNode({
      ...property,
      id: createNodeId(`Property-${property.MST_MLS_NUMBER}`),
      parent: null,
      children: property.imageids,
      internal: {
        type: "PropertySabor",
        content: "content",
        contentDigest: "content digest",
      },
    })
  })

  return
}


function fetchPropertiesSabor(createNode, createNodeId, getCache) {
  console.log("fetch sab3")
  var clientSettings = {
    loginUrl: "http://sabor-rets.connectmls.com/rets/server/login",
    username: process.env.RETS_SABOR_USER,
    password: process.env.RETS_SABOR_PW,
    version: "RETS/1.7.2",
    userAgent: "RETS node-client/4.x",
    method: "GET", // this is the default, or for some servers you may want 'POST'
  }
  var properties = []
  return new Promise(resolve => {
    rets.getAutoLogoutClient(clientSettings, function (client) {
      return client.search
        .query(
          "Property",
          "FR",
          "(L_Status_N=|ACT,NEW),(L_AskingPrice=750000+)",
          {
            limit: 1
          }
        )

        .then(async function (searchData) {
          const props = await getPropsSabor(client, searchData, createNode, createNodeId, getCache)
          resolve(props)
        })
    })
  })
}
async function getPropsSabor(client, searchData, createNode, createNodeId, getCache) {
  var properties = []
  await Promise.all(searchData.results.map(async (property) => {
    const myobjects = await getObjectsSabor(client, property, createNode, createNodeId, getCache)
    property.imageids = myobjects
    properties.push(property)
  }))
  return properties
}
function getObjectsSabor(client, property, createNode, createNodeId, getCache) {
  imageIds = []
  return client.objects
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
            if (i === photoResults.objects.length - 1) {
              return imageIds
            }
          }
        }
      }
      else {
        return null
      }

    })
}



function fetchPropertiesKerrville(createNode, createNodeId, getCache) {
  console.log("fetch kerrville")
  var clientSettings = {
    loginUrl: "http://rets2.navicamls.net/login.aspx",
    username: process.env.RETS_KERRVILLE_USER,
    password: process.env.RETS_KERRVILLE_PW,
    version: "RETS/1.7.2",
    userAgent: "RETS node-client/4.x",
    method: "GET", // this is the default, or for some servers you may want 'POST'
  }
  var properties = []
  return new Promise(resolve => {
    rets.getAutoLogoutClient(clientSettings, function (client) {
      return client.search
        .query("Property", "LAND", "(List_Price=750000+),(rets_status=Active)",
          {
            limit: 1
          }
        )
        .then(async function (searchData) {
          const props = await getPropsNavi(client, searchData, createNode, createNodeId, getCache)
          resolve(props)
        })
    })
  })
}
function fetchPropertiesIdx(createNode, createNodeId, getCache) {
  console.log("fetch idx")
  var clientSettings = {
    loginUrl: "http://rets2.navicamls.net/login.aspx",
    username: process.env.RETS_IDX_USER,
    password: process.env.RETS_IDX_PW,
    version: "RETS/1.7.2",
    userAgent: "RETS node-client/4.x",
    method: "GET", // this is the default, or for some servers you may want 'POST'
  }
  var properties = []
  return new Promise(resolve => {
    rets.getAutoLogoutClient(clientSettings, function (client) {
      return client.search
        .query("Property", "LAND", "(List_Price=750000+),(rets_status=Active)",
          {
            limit: 1
          }
        )
        .then(async function (searchData) {
          const props = await getPropsNavi(client, searchData, createNode, createNodeId, getCache)
          resolve(props)
        })
    })
  })
}
async function getPropsNavi(client, searchData, createNode, createNodeId, getCache) {
  var properties = []
  await Promise.all(searchData.results.map(async (property) => {
    const myobjects = await getObjectsNavi(client, property, createNode, createNodeId, getCache)
    property.imageids = myobjects
    properties.push(property)
  }))
  return properties
}
function getObjectsNavi(client, property, createNode, createNodeId, getCache) {
  imageIds = []
  return client.objects
    .getAllObjects("Property", "Photo", property.MST_MLS_NUMBER)
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
            if (i === photoResults.objects.length - 1) {
              return imageIds
            }
          }
        }
      }
      else {
        return null
      }

    })
}




// function fetchPropertiesIdx(createNode, createNodeId, getCache) {
//   console.log("fetch idx")
//   var clientSettings = {
//     loginUrl: "http://rets2.navicamls.net/login.aspx",
//     username: process.env.RETS_IDX_USER,
//     password: process.env.RETS_IDX_PW,
//     version: "RETS/1.7.2",
//     userAgent: "RETS node-client/4.x",
//     method: "GET", // this is the default, or for some servers you may want 'POST'
//   }
//   var properties = []
//   return new Promise(resolve => {
//     rets.getAutoLogoutClient(clientSettings, function (client) {
//       return client.search
//         .query(
//           "Property",
//           "LAND",
//           "(List_Price=750000+),(rets_status=Active)",
//           {
//             limit: 5,
//           }
//         )
//         .then(function (searchData) {
//           searchData.results.forEach((property, index, array) => {
//             var imageIds = []
//             client.objects
//               .getAllObjects("Property", "Photo", property.MST_MLS_NUMBER)
//               .then(async function (photoResults) {
//                 if (photoResults.objects) {
//                   for (var i = 0; i < photoResults.objects.length; i++) {
//                     if (photoResults.objects[i].error) {
//                       console.log(
//                         "      Error2: " + photoResults.objects[i].error
//                       )
//                     } else {
//                       if (photoResults.objects[i].data) {
//                         var imageNode = await createFileNodeFromBuffer({
//                           buffer: photoResults.objects[i].data,
//                           getCache: getCache,
//                           createNode: createNode,
//                           createNodeId: createNodeId,
//                         })
//                         imageIds.push(imageNode.id)
//                       }
//                     }
//                     if (i === photoResults.objects.length - 1) {
//                       property.imageids = imageIds
//                       properties.push(property)
//                     }
//                   }
//                 }
//               })
//               .then(function () {
//                 if (index === array.length - 1) resolve(properties)
//               })
//           })
//         })
//     })
//   })
// }

// function fetchPropertiesKerrville(createNode, createNodeId, getCache) {
//   console.log("fetch kerrville")
//   var clientSettings = {
//     loginUrl: "http://rets2.navicamls.net/login.aspx",
//     username: process.env.RETS_KERRVILLE_USER,
//     password: process.env.RETS_KERRVILLE_PW,
//     version: "RETS/1.7.2",
//     userAgent: "RETS node-client/4.x",
//     method: "GET", // this is the default, or for some servers you may want 'POST'
//   }
//   var properties = []
//   return new Promise(resolve => {
//     rets.getAutoLogoutClient(clientSettings, function (client) {
//       return client.search
//         .query("Property", "LAND", "(List_Price=750000+),(rets_status=Active)")
//         .then(function (searchData) {
//           searchData.results.forEach((property, index, array) => {
//             var imageIds = []
//             client.objects
//               .getAllObjects("Property", "Photo", property.MST_MLS_NUMBER)
//               .then(async function (photoResults) {
//                 if (photoResults.objects) {
//                   console.log("tes image")
//                   for (var i = 0; i < photoResults.objects.length; i++) {
//                     if (photoResults.objects[i].error) {
//                       console.log(
//                         "      Error2: " + photoResults.objects[i].error
//                       )
//                     } else {
//                       if (photoResults.objects[i].data) {
//                         var imageNode = await createFileNodeFromBuffer({
//                           buffer: photoResults.objects[i].data,
//                           getCache: getCache,
//                           createNode: createNode,
//                           createNodeId: createNodeId,
//                         })
//                         imageIds.push(imageNode.id)
//                       }
//                     }
//                     if (i === photoResults.objects.length - 1) {
//                       property.imageids = imageIds
//                       properties.push(property)
//                     }
//                   }
//                 } else {
//                   console.log("no image")
//                 }
//               })
//               .then(function () {
//                 if (index === array.length - 1) {
//                   console.log("index: " + index)
//                   console.log("array: " + array.length)
//                   console.log("kerr res")
//                   resolve(properties)
//                 }
//               })
//           })
//         })
//     })
//   })
// }

