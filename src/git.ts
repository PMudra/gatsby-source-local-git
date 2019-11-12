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

export { getCommits, Author, Commit }
