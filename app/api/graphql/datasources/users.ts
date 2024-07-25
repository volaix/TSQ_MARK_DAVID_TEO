// MongoDB Data Source for Users
import UserModel, { userSchema } from "../models"
import { MongoDataSource } from "apollo-datasource-mongodb"
import { ObjectId } from "mongodb"
import { InferSchemaType } from "mongoose"

interface UserDocument {
    _id: ObjectId
    username: string
    password: string
    email: string
    interests: [string]
}

export default class Users extends MongoDataSource<InferSchemaType<typeof userSchema>> {
    // Function to fetch all users
    async getAllUsers() {
        try {
            return await UserModel.find()
        } catch (error) {
            throw new Error("Failed to fetch users")
        }
    }

    // Function to create a new user
    async createUser({ input }: any) {
        try {
            return await UserModel.create({ ...input })
        } catch (error) {
            throw new Error("Failed to create user")
        }
    }
}