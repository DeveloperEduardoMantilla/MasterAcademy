import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config("../../../")

export async function conx(){
    try{
        const uri=`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_CLUSTER}.mongodb.net/${process.env.ATLAS_DB}`;
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