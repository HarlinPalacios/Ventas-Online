"use strick"

import mongoose from "mongoose"

export const dbConnection = async () => {
    try{

        mongoose.connection.on("error", () =>{
            console.log("MongoDB | connection failed to MongoDB Service")
        })

        mongoose.connection.on("connected", () =>{
            console.log("MongoDB | connection failed to MongoDB Service")
        })

        mongoose.connection.on("open", () =>{
            console.log("MongoDB | connection failed to MongoDB Service")
        })

        mongoose.connection.on("reconnected", () =>{
            console.log("MongoDB | connection failed to MongoDB Service")
        })

        mongoose.connection.on("disconnected", () =>{
            console.log("MongoDB | connection failed to MongoDB Service")
        })

        await mongoose.connet(process.env.URI_MONGO,{
            serverSelectionTimeoutMS: 500,
            maxPoolSize: 50,
        })

    }catch(err){
        console.log(`Database connection failed: $(err)`)
        
    }
}