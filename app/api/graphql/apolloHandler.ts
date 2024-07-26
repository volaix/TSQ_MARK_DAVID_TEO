
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import mongoose, { InferSchemaType, model, models, Schema } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server"
import mainGraphQl from './_schemas/main.graphql'


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

const userModel = models[modelNames.clientPost] || model(modelNames.clientPost, clientPostSchema)

type Context = {
    dataSources: {
        clientPosts: { getAllUsers: () => any }
    }
}

const handler = startServerAndCreateNextHandler(
    new ApolloServer({
        resolvers: {
            Query: {
                clientPosts: async (_: any, __: any, context: Context) => {
                    try {
                        return await context.dataSources.clientPosts.getAllUsers()
                    } catch (error) {
                        throw new Error("Failed to fetch clientPosts")
                    }
                },
            },
            Mutation: {
                createUser: async (_: any, { input }: any, context: any) => {
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

        },
        typeDefs: mainGraphQl, //can these be autogen?
    }),
    {
        context: async (req: NextApiRequest, res: NextApiResponse) => ({
            req,
            res,
            dataSources: {
                clientPosts: {
                    async getAllUsers() {
                        try {
                            return await userModel.find()
                        } catch (error) {
                            throw new Error("Failed to fetch clientPosts")
                        }
                    },

                    // Function to create a new user
                    async createUser({ input }: any) {
                        try {
                            return await userModel.create({ ...input })
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