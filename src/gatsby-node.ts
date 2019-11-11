import { SourceNodesArgs } from "gatsby"
import { getCommits } from "./git"

export const sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}: SourceNodesArgs) => {
  const commits = await getCommits()

  const authorsByAuthorId = new Map<
    String,
    { name: String; email: String; commits: Array<String> }
  >()

  commits.forEach(commit => {
    const {
      author: { id: authorId, name, email },
      ...filteredCommit
    } = commit

    const author = authorsByAuthorId.get(authorId) || {
      name,
      email,
      commits: [commit.hash],
    }

    authorsByAuthorId.set(authorId, {
      ...author,
      commits: [...author.commits, commit.hash],
    })

    createNode({
      ...filteredCommit,
      author___NODE: createNodeId(authorId),
      id: createNodeId(commit.hash),
      internal: {
        type: "GitCommit",
        contentDigest: createContentDigest(commit),
      },
    })
  })

  authorsByAuthorId.forEach((author, id) => {
    const { commits, ...filteredAuthor } = author
    createNode({
      ...filteredAuthor,
      commits___NODE: commits.map(hash => createNodeId(hash)),
      id: createNodeId(id),
      internal: {
        type: "GitAuthor",
        contentDigest: createContentDigest(author),
      },
    })
  })
}
