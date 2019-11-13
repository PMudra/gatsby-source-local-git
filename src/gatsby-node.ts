import { SourceNodesArgs, GatsbyNode } from "gatsby"
import { getCommits, Commit, Author } from "./git"
import { createNodeFactory } from "./gatsby-node-helper"

const sourceNodes: GatsbyNode["sourceNodes"] = async (
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

  commits.forEach(commit => {
    createCommitNode(commit)
    createAuthorNode(commit.author)
  })
}

export { sourceNodes }
