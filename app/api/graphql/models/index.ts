import { Schema, model, models } from 'mongoose'

export const userSchema = new Schema({
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


const postSchema = new Schema({
    // Define user fields here matching the GraphQL schema
    title: { type: String, required: [true, "All fields are required"] },
    order: {
        type: String,
        required: [true, "All fields are required"],
    },
})

export default models.UserModel || model("UserModel", userSchema)