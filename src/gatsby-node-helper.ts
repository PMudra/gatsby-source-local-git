import { SourceNodesArgs } from "gatsby"

interface Node {
  id: string
}

interface PrepareNodeHelpers {
  createContentDigest: SourceNodesArgs["createContentDigest"]
  createNodeId: SourceNodesArgs["createNodeId"]
}

const prepareNode = <T extends Node>(
  node: T,
  type: string,
  { createNodeId, createContentDigest }: PrepareNodeHelpers
) => ({
  ...node,
  id: createNodeId(node.id),
  internal: {
    type,
    contentDigest: createContentDigest(node),
  },
})

interface CreateNodeFactoryHelpers extends PrepareNodeHelpers {
  createNode: SourceNodesArgs["actions"]["createNode"]
}

const identity = (value: any) => value

const createNodeFactory = <T extends Node>(
  type: string,
  { createNode, ...helpers }: CreateNodeFactoryHelpers,
  preprocessNode: (node: T, helpers: PrepareNodeHelpers) => Node = identity
) => (node: T) =>
  createNode(prepareNode(preprocessNode(node, helpers), type, helpers))

export { createNodeFactory }
