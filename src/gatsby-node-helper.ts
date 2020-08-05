import { NodePluginArgs, NodeInput } from "gatsby"

interface Node {
  id: string
}

const prepareNode = <T extends Node>(
  node: T,
  type: string,
  { createNodeId, createContentDigest }: NodePluginArgs
) => ({
  ...node,
  id: createNodeId(node.id),
  internal: {
    type,
    contentDigest: createContentDigest(node),
  },
})

const identity = <T>(value: T) => value

const createNodeFactory = <T extends Node>(
  type: string,
  helpers: NodePluginArgs,
  preprocessNode: (node: T, helpers: NodePluginArgs) => Node = identity
) => (node: T) =>
  helpers.actions.createNode(
    prepareNode(preprocessNode(node, helpers), type, helpers) as NodeInput
  )

export { createNodeFactory }
