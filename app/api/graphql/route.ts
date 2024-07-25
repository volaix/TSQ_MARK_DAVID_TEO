
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import mongoose from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server"
import Users from "./datasources"
import UserModel from "./models"
import resolvers from "./resolvers"
import typeDefs from "./schema"

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

const server = new ApolloServer({
    resolvers,
    typeDefs,

})



const handler = startServerAndCreateNextHandler(server, {
    context: async (req: NextApiRequest, res: NextApiResponse) => ({
        req,
        res,
        dataSources: {
            users: new Users({ modelOrCollection: UserModel }),
        },
    }),
})

export async function GET(request: NextRequest) {
    return handler(request)
}
export async function POST(request: NextRequest) {
    return handler(request)
}