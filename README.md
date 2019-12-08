# gatsby-source-local-git

[![npm](https://img.shields.io/npm/v/gatsby-source-local-git?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/gatsby-source-local-git)
[![MIT](https://img.shields.io/github/license/pmudra/gatsby-source-local-git?style=for-the-badge)](https://github.com/PMudra/gatsby-source-local-git/blob/master/LICENSE)
[![build](https://img.shields.io/github/workflow/status/PMudra/gatsby-source-local-git/Node%20CI?logo=github&style=for-the-badge)](https://github.com/PMudra/gatsby-source-local-git/actions)

A Gatsby source plugin for sourcing data into your Gatsby application from your local git repository.

## Description

This source plugin enables gatsby sites to include meta data about their own git repository at build time. Possible features are:

- Printing the hash of the **latest git commit** on an about page
- Including the name of the **current git branch** (might be useful for canary builds or split deployments)
- Creating a list of all git authors / contributors

Missing a feature? Please create an issue (or even a pull request).

## How to install

```shell
npm install --save gatsby-source-local-git
```

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

### Commits

You can query commit nodes like the following:

```graphql
{
  allGitCommit(limit: 25, sort: { fields: date, order: DESC }) {
    edges {
      node {
        hash
        message
        body
        date(fromNow: true)
        refs
        author {
          name
          email
        }
      }
    }
    totalCount
  }
}
```

Query hash of latest commit:

```graphql
{
  gitCommit(latest: { eq: true }) {
    hash
  }
}
```

### Tags

You can query tags like this:

```graphql
{
  allGitTag {
    edges {
      node {
        name
      }
    }
  }
}
```

Query the latest tag:

```graphql
{
  gitTag(latest: { eq: true }) {
    name
  }
}
```

Tags will simply be sorted by semantic version number to find the latest tag (including every tag containing a dot like `v1.2.3` or `1.2` but not `newest-feature`).

### Branches

You can query branches like this:

```graphql
{
  allGitBranch {
    edges {
      node {
        commit
        id
        name
        current
      }
    }
  }
}
```

Query the current branch:

```graphql
{
  gitBranch(current: { eq: true }) {
    name
  }
}
```

### Authors

You can query author nodes like the following:

```graphql
{
  allGitAuthor(sort: { fields: name }) {
    nodes {
      name
      email
    }
    totalCount
  }
}
```

<!-- ## How to run tests -->

## How to develop locally

### Clone gatsby default starter and change directories into site folder

```shell
git clone https://github.com/gatsbyjs/gatsby-starter-default.git && cd gatsby-starter-default
```

### Add this repository as git submodule

```
git submodule add https://github.com/PMudra/gatsby-source-local-git.git plugins/gatsby-source-local-git
```

### Add the plugin to `gatsby-config.js`

See top of readme for an example.

### Start developing the plugin

Just be sure to switch to the right directory depending on the task. Working on plugin:

```shell
cd plugins/gatsby-source-local-git
npm install
npm start
```

See if the plugin is working as expected (in root directory i.e. `gatsby-starter-default`):

```shell
npm install
npm start
```

<!-- ## How to contribute

If you have unanswered questions, would like help with enhancing or debugging the plugin, it is nice to include instructions for people who want to contribute to your plugin. -->
