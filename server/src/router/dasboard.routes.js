import express from "express";
import passport  from "passport";
import {appAuth, appOut} from "../utils/auth.js";
const appDasboard = express();
appDasboard.use(express.json());

appDasboard.get("/",appAuth, (req,res)=>{
    res.send(req.user)
})


export default appDasboard;