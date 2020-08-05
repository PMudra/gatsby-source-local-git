import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  {
    allGitCommit(limit: 10, sort: { fields: date, order: DESC }) {
      edges {
        node {
          hash
          message
          date
          diff {
            files {
              file
            }
          }
        }
      }
      totalCount
    }
    gitCommit(latest: { eq: true }) {
      hash
      date
    }
    allGitTag {
      edges {
        node {
          name
        }
      }
    }
    gitTag(latest: { eq: true }) {
      name
    }
    allGitBranch {
      edges {
        node {
          commit
          name
          current
        }
      }
    }
    gitBranch(current: { eq: true }) {
      name
    }
    allGitAuthor {
      totalCount
    }
  }
`

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h3>Example website</h3>
    <p>
      This is a simple example website demonstrating the features of the{" "}
      <a href="https://www.gatsbyjs.org/packages/gatsby-source-local-git/">
        gatsby-source-local-git
      </a>{" "}
      Gatsby plugin. Based on the{" "}
      <a href="https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-default/">
        Gatsby default starter
      </a>
      .
    </p>
    <p>
      gatsby-source-local-git is a Gatsby source plugin for sourcing data into
      your Gatsby application from your local git repository. The Plugin is open
      source and hosted on{" "}
      <a href="https://github.com/PMudra/gatsby-source-local-git">GitHub</a>.
    </p>
    <p>The following information is generated using the plugin.</p>
    <h3>Summary</h3>
    <ul>
      <li>Author count: {data.allGitAuthor.totalCount}</li>
      <li>Commit count: {data.allGitCommit.totalCount}</li>
      <li>
        Commit: {data.gitCommit.hash.substring(0, 8)} (
        {new Date(data.gitCommit.date).toLocaleString()})
      </li>
      <li>Latest tag: {data.gitTag.name}</li>
      <li>Current branch: {data.gitBranch.name}</li>
    </ul>
    <h3>Branches</h3>
    <ul>
      {data.allGitBranch.edges.map(({ node: branch }) => (
        <li
          key={branch.id}
          style={{ fontWeight: branch.current ? "bold" : "normal" }}
        >
          {branch.name}
        </li>
      ))}
    </ul>
    <h3>Tags</h3>
    <ul>
      {data.allGitTag.edges.map(({ node: tag }) => (
        <li key={tag.id}>{tag.name}</li>
      ))}
    </ul>
    <h3>Latest Commits</h3>
    <ul>
      {data.allGitCommit.edges.map(({ node: commit }) => (
        <li key={commit.id}>
          <strong>{commit.hash.substring(0, 8)}</strong> (
          {new Date(commit.date).toLocaleString()})<br />
          {commit.message}
          <br />
          {commit.diff && "Changed files:"}
          {commit.diff && (
            <ul>
              {commit.diff.files.map(({ file }) => (
                <li>{file}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </Layout>
)
