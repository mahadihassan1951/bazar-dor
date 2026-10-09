
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

  emailAndPassword: {
    enabled: true,
  },
});

