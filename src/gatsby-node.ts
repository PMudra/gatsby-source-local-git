import { SourceNodesArgs, GatsbyNode, NodeInput } from "gatsby"
import { getCommits, Commit, Author } from "./git"

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
  preprocessNode: (node: T, helpers: PrepareNodeHelpers) => T = identity
) => (node: T) =>
  createNode(prepareNode(preprocessNode(node, helpers), type, helpers))

const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  createContentDigest,
  createNodeId,
  actions: { createNode },
}: SourceNodesArgs) => {
  const helpers: CreateNodeFactoryHelpers = {
    createNode,
    createNodeId,
    createContentDigest,
  }

  const createCommitNode = createNodeFactory<Commit>("GitCommit", helpers)

  const commits = await getCommits()

  commits.forEach(commit => createCommitNode(commit))

  // const authorsByAuthorId = new Map<
  //   String,
  //   { name: String; email: String; commits: Array<String> }
  // >()

  // commits.forEach(commit => {
  //   const {
  //     author: { id: authorId, name, email },
  //     ...filteredCommit
  //   } = commit

  // const author = authorsByAuthorId.get(authorId) || {
  //   name,
  //   email,
  //   commits: [commit.hash],
  // }

  // authorsByAuthorId.set(authorId, {
  //   ...author,
  //   commits: [...author.commits, commit.hash],
  // })

  //   createNode({
  //     ...filteredCommit,
  //     author___NODE: createNodeId(authorId),
  //     id: createNodeId(commit.hash),
  //     internal: {
  //       type: "GitCommit",
  //       contentDigest: createContentDigest(commit),
  //     },
  //   })
  // })

  // authorsByAuthorId.forEach((author, id) => {
  //   const { commits, ...filteredAuthor } = author
  //   createNode({
  //     ...filteredAuthor,
  //     commits___NODE: commits.map(hash => createNodeId(hash)),
  //     id: createNodeId(id),
  //     internal: {
  //       type: "GitAuthor",
  //       contentDigest: createContentDigest(author),
  //     },
  //   })
  // })
}

export { sourceNodes }
