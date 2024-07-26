
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import mongoose, { InferSchemaType, model, models, Schema } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server"
import mainGraphQl from './_schemas/main.graphql'
import { Resolvers } from '@/__generated__/resolversTypes'


/**
 * List of all models used
 */
const modelNames = {
    clientPost: 'clientpost'
}

/**
 * Make new clientPost schema
 */
const clientPostSchema = new Schema({
    title: { type: String, required: [true, "All fields are required"] },
    order: {
        type: Number,
        required: [true, "All fields are required"],
    },
})

const clientModel = models[modelNames.clientPost] || model(modelNames.clientPost, clientPostSchema)

type ClientPost = InferSchemaType<typeof clientPostSchema>

export interface MyContext {
    dataSources: {
        clientPosts: {
            getAllPosts: () => any
            createPost: ({ input }: any) => any
        }
    }
}

const resolvers: Resolvers = {
    Query: {
        clientPosts: async (_: any, __: any, context: MyContext) => {
            try {
                return await context.dataSources.clientPosts.getAllPosts()
            } catch (error) {
                throw new Error("Failed to fetch clientPosts")
            }
        },
    },
    Mutation: {
        createClientPost: async (_: any, { input }: any, context: any) => {
            try {
                const newUser = await context.dataSources.clientPosts.createUser({
                    input,
                })
                return newUser
            } catch (error) {
                throw new Error("Failed to create user")
            }
        },
    },

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
                            return await clientModel.find()
                        } catch (error) {
                            throw new Error("Failed to fetch clientPosts")
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