import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUri = process.env.BETTER_AUTH_MONGODB_URI;

if (!mongoUri) {
  throw new Error("BETTER_AUTH_MONGODB_URI is missing");
}

const client = new MongoClient(mongoUri);

const db = client.db("better-auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: { 
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID, 
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET, 
    },
    github: { 
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID, 
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET, 
    },
  },
});