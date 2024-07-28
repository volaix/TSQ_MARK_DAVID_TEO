
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { model, models } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import mainGraphQl from './schema.graphql'
import resolvers from './resolvers'
import { clientPostSchema, modelNames } from './util'
import { Document, Model } from 'mongoose'
import { ClientPost } from "@/__generated__/graphql"


const clientModel = models[modelNames.clientPost] || model(modelNames.clientPost, clientPostSchema)

export interface Context {
    dataSources: {
        clientPosts: {
            getAllPosts(): Promise<ClientPost[]>
            updatePostOrder(postId: string, order: number): Promise<ClientPost | null>
            createPost({ input }: { input: Partial<ClientPost> }): Promise<ClientPost>
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
                    async createPost({ input }: any) {
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