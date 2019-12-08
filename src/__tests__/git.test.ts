import { getBranches, getCommits, getTags } from "../git"

test("First commit should match snapshot", async () => {
  const commits = await getCommits()
  expect(commits.pop()).toMatchSnapshot()
})

test("First tag should match snapshot", async () => {
  const [firstTag] = await getTags()
  expect(firstTag).toMatchSnapshot()
})

test("Exactly one branch should be current", async () => {
  const branches = await getBranches()
  expect(branches.filter(branch => branch.current)).toHaveLength(1)
})