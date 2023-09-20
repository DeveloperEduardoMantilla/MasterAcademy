import express from "express";
import dotenv from "dotenv";
import {conx} from "./config/atlas.js";

dotenv.config("../../");
let appExpress = express();

appExpress.use(express.json());
appExpress.get("/", async(req,res)=>{
    let db= await conx();
    let user = db.collection("user");
    let result=await user.find({}).toArray();
    res.send(result)
})

let config = JSON.parse(process.env.MY_SERVER)
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`)
})