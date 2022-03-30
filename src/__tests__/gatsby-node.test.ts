import { sourceNodes, createSchemaCustomization } from "../gatsby-node"

test("Calling sourceNodes should call createNode function", async () => {
  const createNode = jest.fn()

  await sourceNodes({
    actions: {
      createNode,
    },
    createNodeId: () => {},
    createContentDigest: () => {},
  } as any)

  expect(createNode).toBeCalled()
})

test("Calling createSchemaCustomization should call createTypes function", async () => {
  const createTypes = jest.fn()

  createSchemaCustomization({
    actions: { createTypes },
  } as any)

  expect(createTypes).toBeCalled()
})
