import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export default async function ConnectDatabase(){
   const connectionString = process.env.MONGODB_CONNECTION_STRING
   await mongoose.connect(connectionString)
}