import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mongoose, { Schema } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import Users from "./datasources/users";
import UserModel from "./models";
import typeDefs from "./typedefs";

type Context = {
  dataSources: {
    users: { getAllUsers: () => any };
    // posts: { getAllPosts: () => any };
  };
};

const resolvers = {
  Query: {
    users: async (_: any, __: any, context: Context) => {
      try {
        return await context.dataSources.users.getAllUsers();
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    // posts: async (_: any, __: any, context: Context) => {
    //   try {
    //     return await context.dataSources.posts.getAllPosts();
    //   } catch (error) {
    //     throw new Error("Failed to fetch users");
    //   }
    // },
  },
  Mutation: {
    createUser: async (_: any, { input }: any, context: any) => {
      try {
        const newUser = await context.dataSources.users.createUser({
          input,
        });
        return newUser;
      } catch (error) {
        throw new Error("Failed to create user");
      }
    },
  },
};

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log("🎉 connected to database successfully");
    }
  } catch (error) {
    console.error(error);
  }
};
connectDB();

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
          users: new Users({
              modelOrCollection: new Schema({
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
              }) }),
        // posts: new Posts({ modelOrCollection: PostModel }),
      },
    }),
  }
);

export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
