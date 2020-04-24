import { SourceNodesArgs } from "gatsby"
import {
  getCommits,
  getTags,
  getBranches,
  Commit,
  Author,
  Tag,
  Branch,
} from "./git"
import { createNodeFactory } from "./gatsby-node-helper"

const sourceNodes = async (
  helpers: SourceNodesArgs
) => {
  const createCommitNode = createNodeFactory<Commit>(
    "GitCommit",
    helpers,
    ({ author, ...commit }, { createNodeId }) => ({
      ...commit,
      author___NODE: createNodeId(author.id),
    })
  )
  const createAuthorNode = createNodeFactory<Author>("GitAuthor", helpers)
  const commits = await getCommits()

  commits.forEach((commit) => {
    createCommitNode(commit)
    createAuthorNode(commit.author)
  })

  const createTagNode = createNodeFactory<Tag>("GitTag", helpers)
  const tags = await getTags()
  tags.forEach((tag) => createTagNode(tag))

  const createBranchNode = createNodeFactory<Branch>("GitBranch", helpers)
  const branches = await getBranches()
  branches.forEach((branch) => createBranchNode(branch))
}

export { sourceNodes }
