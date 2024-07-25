import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import mongoose, { InferSchemaType, model, models, Schema } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server"

const modelNames = {
    listings: 'listings'
}

const userSchema = new Schema({
    first_name: { type: String, required: [true, "All fields are required"] },
    last_name: {
        type: String,
        required: [true, "All fields are required"],
    },
    email: {
        type: String,
        required: [true, "All fields are required"],
    },
    age: {
        type: String,
        required: [true, "All fields are required"],
    },
    active: Boolean,
})

const userModel = models[modelNames.listings] || model(modelNames.listings, userSchema)
const typeDefs = `#graphql
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    age: Int!
    active: Boolean
}
  
  input NewUserInput {
    first_name: String!
    last_name: String!
    email: String!
    age: Int!
  }
  type Query {
    users: [User]
  }
  type Mutation {
    createUser(input: NewUserInput!): User
  }
`

type Context = {
    dataSources: {
        users: { getAllUsers: () => any }
    }
}


const uri = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        if (uri) {
            await mongoose.connect(uri)
            console.log("🎉 connected to database successfully")
        }
    } catch (error) {
        console.error(error)
    }
}
connectDB()

const resolvers = {
    Query: {
        users: async (_: any, __: any, context: Context) => {
            try {
                return await context.dataSources.users.getAllUsers()
            } catch (error) {
                throw new Error("Failed to fetch users")
            }
        },
    },
    Mutation: {
        createUser: async (_: any, { input }: any, context: any) => {
            try {
                const newUser = await context.dataSources.users.createUser({
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
        typeDefs, //can these be autogen?
    }),
    {
        context: async (req: NextApiRequest, res: NextApiResponse) => ({
            req,
            res,
            dataSources: {
                users: {
                    async getAllUsers() {
                        try {
                            return await userModel.find()
                        } catch (error) {
                            throw new Error("Failed to fetch users")
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
                    modelOrCollection: userSchema
                }
            },
        }),
    }
)

export async function GET(request: NextRequest) {
    return handler(request)
}
export async function POST(request: NextRequest) {
    return handler(request)
}
