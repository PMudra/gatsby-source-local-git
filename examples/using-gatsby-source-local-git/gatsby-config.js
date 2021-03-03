module.exports = {
  siteMetadata: {
    title: `gatsby-source-local-git`,
    description: `Simple example website demonstrating the features of the gatsby-source-local-git Gatsby plugin. Based on Gatsby default starter.`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `using-gatsby-source-local-git`,
        short_name: `local-git`,
        start_url: `/`,
        background_color: `#239B56`,
        theme_color: `#239B56`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      // resolve from node_modules
      resolve: `gatsby-source-local-git`,

      // resolve dev version from root of repository (don't forget to build)
      // resolve: require.resolve(`../..`),
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
