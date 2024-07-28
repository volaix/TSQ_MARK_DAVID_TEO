
import { ClientPost } from "@/__generated__/graphql"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { model, models } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import resolvers from './resolvers'
import mainGraphQl from './schema.graphql'
import { clientPostSchema, modelNames } from './util'
import { mockDataArray } from "@/__generated__/mockData"


const clientModel = models[modelNames.clientPost] || model(modelNames.clientPost, clientPostSchema)

export interface Context {
    dataSources: {
        clientPosts: {
            getAllPosts(): Promise<ClientPost[]>
            updatePostOrder(postId: string, order: number): Promise<ClientPost | null>
            createPost({ input }: { input: Partial<ClientPost> }): Promise<ClientPost>
            mockData(): Promise<ClientPost[]>
        }
    }
}

const handler = startServerAndCreateNextHandler(
    new ApolloServer({
        resolvers,
        typeDefs: mainGraphQl,
    }),
    {
        context: async (req: NextApiRequest, res: NextApiResponse) => ({
            req,
            res,
            dataSources: {
                clientPosts: {
                    async mockData() {
                        try {
                            const posts = await Promise.all(
                                mockDataArray.map(data => clientModel.create(data))
                            )
                            return posts
                        } catch (error) {
                            throw new Error("Failed to upload mock data")
                        }
                    },
                    async getAllPosts() {
                        try {
                            const posts = await clientModel.find().sort({ order: 1 })
                            return posts
                        } catch (error) {
                            throw new Error("Failed to fetch clientPosts")
                        }
                    },
                    async updatePostOrder(postId: string, order: number) {
                        try {
                            const updatedPost = await clientModel.findByIdAndUpdate(
                                postId,
                                { order },
                                { new: true }
                            )
                            return updatedPost
                        } catch (error) {
                            throw new Error("Failed to update posts")
                        }
                    },
                    async createPost({ input }: { input: Partial<ClientPost> }) {
                        try {
                            return await clientModel.create({ ...input })
                        } catch (error) {
                            throw new Error("Failed to create user")
                        }
                    },
                    modelOrCollection: clientPostSchema
                }
            },
        }),
    }
)
export default handler