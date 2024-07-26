
import { ClientPost, NewClientPost, Resolvers } from '@/__generated__/resolversTypes'
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { InferSchemaType, model, models, Schema } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import mainGraphQl from './_schemas/main.graphql'
import { clientPostSchema, modelNames, Post } from './util'
import resolvers from './resolvers'

const clientModel = models[modelNames.clientPost] || model(modelNames.clientPost, clientPostSchema)

export interface Context {
    dataSources: {
        clientPosts: {
            getAllPosts: () => any
            createPost: ({ input }: any) => any
            updatePostOrder: (postId: string, order: number) => any
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
                        console.log('running updatePost inside handler')
                        try {
                            const updatedPost = await clientModel.find()
                            console.log('updatedPost: ', updatedPost)
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