import { SourceNodesArgs, GatsbyNode, NodeInput } from "gatsby"
import { getCommits, Commit, Author } from "./git"

const identity = (value: any) => value

interface Node {
  id: string
}

interface PreprocessNodeHelpers {
  createNodeId: SourceNodesArgs["createNodeId"]
}

interface PrepareNodeHelpers extends PreprocessNodeHelpers {
  createContentDigest: SourceNodesArgs["createContentDigest"]
}

interface CreateNodeHelpers extends PrepareNodeHelpers {
  createNode: SourceNodesArgs["actions"]["createNode"]
}

interface PreprocessNode<T extends Node> {
  (node: T, helpers: PreprocessNodeHelpers): T
}

// interface PrepareNode {
//   <T extends Node>(node: T, type: string, helpers: PrepareNodeHelpers): T &
//     NodeInput
// }

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

const createNode = <T extends Node>(
  node: T,
  type: string,
  { createNode, ...helpers }: CreateNodeHelpers,
  preProcessor: PreprocessNode<T> = identity
) => createNode(prepareNode(preProcessor(node, helpers), type, helpers))

const createNodeFactory = <T extends Node>(
  helpers: CreateNodeHelpers,
  type: string,
  prepareNode: PrepareNode,
  preProcessor: PreprocessNode<T>
) => (node: T) => {}

// const createCommitNodeFactory = createNodeFactory<Commit>("GitCommit")

const sourceNodes: GatsbyNode["sourceNodes"] = async (
  args: SourceNodesArgs
) => {
  const createCommitNode = createCommitNodeFactory(args)

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
