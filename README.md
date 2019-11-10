# gatsby-source-local-git

A Gatsby source plugin for sourcing data into your Gatsby application from your local git repository.

<!-- ## Description

Include a summary of what this plugin accomplishes. Is there a demo site that shows how this plugin operates? If so, include a link to the deployed demo site and/or its source code here. -->

## How to install

`npm install --save gatsby-source-local-git`

<!-- ## Available options (if any) -->

<!-- ## When do I use this plugin?

Include stories about when this plugatsby-source-local-gitgin is helpful and/or necessary. -->

## Examples of usage

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [`gatsby-source-local-git`],
}
```

## How to query for data

You can query commit nodes like the following:

```graphql
{
  allGitCommit {
    edges {
      node {
        hash
        message
        body
        date(fromNow: true)
      }
    }
  }
}
```

You can query auhtor nodes like the following:

```graphql
{
  allGitAuthor {
    edges {
      node {
        name
        email
      }
    }
  }
}
```

<!-- ## How to run tests

## How to develop locally

## How to contribute

If you have unanswered questions, would like help with enhancing or debugging the plugin, it is nice to include instructions for people who want to contribute to your plugin. -->
