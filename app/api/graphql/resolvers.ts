
import { NewClientPost, Resolvers } from '@/__generated__/resolversTypes'
import { Context } from './apolloHandler'

 const resolvers: Resolvers = {
    Query: {
        clientPosts: async (_: unknown, __: unknown, context: Context) => {
            try {
                return await context.dataSources.clientPosts.getAllPosts()
            } catch (error) {
                throw new Error("Failed to fetch clientPosts")
            }
        },
    },
    Mutation: {
        updateClientPost: async (_: unknown, { id, order }: { id: string, order: number }, context: Context) => {
            try {
                const updatedPost = await context.dataSources.clientPosts.updatePostOrder(id, order)
                return updatedPost
            } catch (error) {
                throw new Error("Failed to update posts")
            }
        },
        createClientPost: async (_: unknown, { input }: { input: NewClientPost }, context: Context) => {
            try {
                const newPost = await context.dataSources.clientPosts.createPost({
                    input,
                })
                return newPost
            } catch (error) {
                throw new Error("Failed to create user")
            }
        },
    },
}

export default resolvers