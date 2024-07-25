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
