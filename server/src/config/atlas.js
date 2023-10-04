import { MongoClient } from "mongodb";
import {loadEnv } from 'vite'
let env = loadEnv("development", process.cwd(), "VITE")

export async function conx(){
    try{
        const uri=`mongodb+srv://${env.VITE_ATLAS_USER}:${env.VITE_ATLAS_PASSWORD}@${env.VITE_ATLAS_CLUSTER}.mongodb.net/${env.VITE_ATLAS_DB}`;
        const options={
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        const client = await MongoClient.connect(uri,options);
        return client.db();
    }catch(e){
        return {status:500, message:e.message}
    }
}