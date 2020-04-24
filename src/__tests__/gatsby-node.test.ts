import { sourceNodes } from "../gatsby-node"
import { SourceNodesArgs } from "gatsby"

test("Calling sourceNodes should call createNode method", async () => {
  const createNode = jest.fn()
  await sourceNodes({
    actions: { createNode: createNode as Function },
    createNodeId: new Function(),
    createContentDigest: new Function(),
  } as SourceNodesArgs)

  expect(createNode).toBeCalled()
})
