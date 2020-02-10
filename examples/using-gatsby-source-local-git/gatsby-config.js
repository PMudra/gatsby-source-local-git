module.exports = {
  siteMetadata: {
    title: `gatsby-source-local-git Example`,
    description: `Simple example site showing the features of gatsby-source-local-git Gatsby plugin. Based on Gatsby default starter.`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `using-gatsby-source-local-git`,
        short_name: `local-git`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-source-local-git`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
