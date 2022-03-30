import type { CreateSchemaCustomizationArgs, SourceNodesArgs } from "gatsby"
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
import type { DiffResult } from "simple-git"

export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  actions.createTypes(/* GraphQL */ `
    type GitCommit implements Node {
      diff: DiffSummary
    }
    type DiffSummary {
      changed: Int!
      files: [DiffResultFile!]!
      insertions: Int!
      deletions: Int!
    }
    interface DiffResultFile {
      file: String!
      binary: Boolean!
    }
    type DiffResultTextFile implements DiffResultFile {
      file: String!
      binary: Boolean!
      changes: Int!
      insertions: Int!
      deletions: Int!
    }
    type DiffResultBinaryFile implements DiffResultFile {
      file: String!
      binary: Boolean!
      before: Int!
      after: Int!
    }
  `)
}

const createDiff = ({ files, ...rest }: DiffResult) => ({
  ...rest,
  files: files.map((file) => ({
    ...file,
    internal: {
      type: file.binary ? "DiffResultBinaryFile" : "DiffResultTextFile",
    },
  })),
})

export const sourceNodes = async (helpers: SourceNodesArgs) => {
  const createCommitNode = createNodeFactory<Commit>(
    "GitCommit",
    helpers,
    ({ author, diff, ...commit }, { createNodeId }) => ({
      ...commit,
      diff: diff && createDiff(diff),
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
