/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const { site, sitePlugin } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      sitePlugin(name: { eq: "gatsby-source-local-git" }) {
        version
        pluginFilepath
      }
    }
  `)

  const localPluginUsed = !sitePlugin.pluginFilepath.includes("node_modules")
  const versionSuffix = localPluginUsed ? "(local)" : ""

  return (
    <>
      <Header
        siteTitle={`${site.siteMetadata.title} - v${sitePlugin.version} ${versionSuffix}`}
      />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
