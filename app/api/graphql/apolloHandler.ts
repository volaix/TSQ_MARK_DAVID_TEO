
import { Resolvers } from '@/__generated__/resolversTypes'
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { InferSchemaType, model, models, Schema } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
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
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: [true, "All fields are required"] },
    order: {
        type: Number,
        required: [true, "All fields are required"],
    },
})

const clientModel = models[modelNames.clientPost] || model(modelNames.clientPost, clientPostSchema)

type Post = InferSchemaType<typeof clientPostSchema>

export interface Context {
    dataSources: {
        clientPosts: {
            getAllPosts: () => any
            createPost: ({ input }: any) => any
        }
    }
}

const resolvers: Resolvers = {
    Query: {
        clientPosts: async (_: any, __: any, context: Context) => {
            try {
                return await context.dataSources.clientPosts.getAllPosts()
            } catch (error) {
                throw new Error("Failed to fetch clientPosts")
            }
        },
    },
    Mutation: {
        createClientPost: async (_: any, { input }: any, context: Context) => {
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
                    async updatePost(post: Post) {
                        try {
                            return await clientModel.find()
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