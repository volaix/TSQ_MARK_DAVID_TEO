

import { NewClientPost, Resolvers } from '@/__generated__/resolversTypes'
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { InferSchemaType, model, models, Schema } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import mainGraphQl from './_schemas/main.graphql'

//-------------CONSTS-------------
/**
 * List of all models used
 */
export const modelNames = {
    clientPost: 'clientpost'
}

//------------MONGO SCHEMAS-------------
export const clientPostSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: [true, "All fields are required"] },
    order: {
        type: Number,
        required: [true, "All fields are required"],
        min: [10000, "Order must be at least 10000"],
        max: [100000, "Order must be at most 100000"],
    }
})


//------------TYPES--------------
/**
 * Post type that you get back from MongoDb. _id becomes available as id. And __typename is appended.
 */
export type Post = Omit<InferSchemaType<typeof clientPostSchema>, '_id'> & {
    id: string
    __typename: typeof modelNames.clientPost
}