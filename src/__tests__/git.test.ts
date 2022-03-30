import { getBranches, getCommits, getTags } from "../git"

test("First commit should match snapshot", async () => {
  const commits = await getCommits()
  expect(commits.pop()).toMatchSnapshot()
})

test("Exactly one commit should be latest", async () => {
  const commits = await getCommits()
  expect(commits.filter((commit) => commit.latest)).toHaveLength(1)
})

test("First tag should match snapshot", async () => {
  const [firstTag] = await getTags()
  expect(firstTag).toMatchSnapshot()
})

test("Exactly one tag should be latest", async () => {
  const tags = await getTags()
  expect(tags.filter((tag) => tag.latest)).toHaveLength(1)
})

test("Exactly one branch should be current", async () => {
  const branches = await getBranches()
  expect(branches.filter((branch) => branch.current)).toHaveLength(1)
})
