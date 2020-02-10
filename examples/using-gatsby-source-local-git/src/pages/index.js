import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  {
    allGitCommit(limit: 25, sort: { fields: date, order: DESC }) {
      edges {
        node {
          hash
          message
          date(fromNow: true)
        }
      }
      totalCount
    }
    allGitTag(filter: {}) {
      edges {
        node {
          name
        }
      }
    }
    allGitBranch {
      edges {
        node {
          name
          current
        }
      }
    }
  }
`

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <h2>Branches:</h2>
    <ul>
      {data.allGitBranch.edges.map(({ node: branch }) => (
        <li key={branch.id} style={{fontWeight: branch.current ? 'bold' : 'normal'}}>{branch.name}</li>
      ))}
    </ul>
    <h2>Tags:</h2>
    <ul>
      {data.allGitTag.edges.map(({ node: tag }) => (
        <li key={tag.id}>{tag.name}</li>
      ))}
    </ul>
    <h2>Commits:</h2>
      <p>Total: {data.allGitCommit.totalCount}</p>
    <ul>
      {data.allGitCommit.edges.map(({ node: commit }) => (
        <li key={commit.id}>{commit.message} ({commit.date})</li>
      ))}
    </ul>
  </Layout>
)
