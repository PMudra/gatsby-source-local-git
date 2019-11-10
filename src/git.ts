import git from "simple-git/promise"
import { DefaultLogFields } from "simple-git/typings/response"

const createAuthor = ({ name, email }: { name: String; email: String }) => ({
  name,
  email,
  id: `${name}__${email}`,
})

const getCommits = async () => {
  const {
    all,
    latest: { hash: latestHash },
  } = await git().log<DefaultLogFields>()

  return all.map(({ hash, date, author_email, author_name, ...rest }) => ({
    hash,
    ...rest,
    date: new Date(date),
    latest: hash === latestHash,
    author: createAuthor({ name: author_name, email: author_email }),
  }))
}

export { getCommits }
