import git from "simple-git/promise"
import { DefaultLogFields } from "simple-git/typings/response"

interface Author {
  id: string
  name: string
  email: string
}

interface Commit {
  id: string
  hash: string
  message: string
  body: string
  refs: string
  date: Date
  latest: boolean
  author: Author
}

interface Tag {
  id: string
  name: string
  latest: boolean
}

const createAuthor = (name: string, email: string): Author => ({
  name,
  email,
  id: `${name}__${email}`,
})

const getCommits = async (): Promise<Commit[]> => {
  const {
    all,
    latest: { hash: latestHash },
  } = await git().log<DefaultLogFields>()

  return all.map(({ hash, date, author_email, author_name, ...rest }) => ({
    hash,
    ...rest,
    id: hash,
    date: new Date(date),
    latest: hash === latestHash,
    author: createAuthor(author_name, author_email),
  }))
}

const getTags = async (): Promise<Tag[]> => {
  const { all, latest } = await git().tags()

  return all.map(name => ({
    name,
    id: name,
    latest: name === latest,
  }))
}

export { getCommits, getTags, Author, Commit, Tag }
