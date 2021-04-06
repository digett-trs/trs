const { createFileNodeFromBuffer } = require(`gatsby-source-filesystem`)

const createNodeHelpers = require(`gatsby-node-helpers`).default

const { createNodeFactory } = createNodeHelpers({ typePrefix: `mysql` })

function attach(node, key, value, ctx) {
  if (Buffer.isBuffer(value)) {
    ctx.linkChildren.push(parentNodeId =>
      createFileNodeFromBuffer({
        buffer: value,
        getCache: ctx.getCache,
        createNode: ctx.createNode,
        createNodeId: ctx.createNodeId,
      })
    )
    value = `Buffer`
  }

  node[key] = value
}

function createMySqlNodes({ name, __sql, idField, keys }, results, ctx) {
  const MySqlNode = createNodeFactory(name)
  ctx.linkChildren = []
  console.log(results)
  return result.forEach(prop => {
    node = ctx.createNode(node)
    for (const link of ctx.linkChildren) {
      link(node.id)
    }
  })

  // return __sql.forEach(row => {
  //   if (!keys) keys = Object.keys(row)

  //   const node = { id: row[idField] }

  //   for (const key of keys) {
  //     attach(node, key, row[key], ctx)
  //   }

  //   node = ctx.createNode(node)

  //   for (const link of ctx.linkChildren) {
  //     link(node.id)
  //   }
  // })
}

module.exports = createMySqlNodes
