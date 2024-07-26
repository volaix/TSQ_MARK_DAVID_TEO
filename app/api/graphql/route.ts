import mongoose from "mongoose"
import { NextRequest } from "next/server"
import apolloHandler from "./apolloHandler"

/**
 * Connect to MongoDB with mongoose
 */
const connectDB = async () => {
    const uri = process.env.MONGODB_URI
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

//----------ROUTE HANDLERS-----------

export async function GET(request: NextRequest) {
    return apolloHandler(request)
}
export async function POST(request: NextRequest) {
    return apolloHandler(request)
}
