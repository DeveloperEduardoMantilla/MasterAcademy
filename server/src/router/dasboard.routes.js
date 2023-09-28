import express from "express";
import passport  from "passport";
import routesVersioning from "express-routes-versioning";
import {getUsers} from "../support/v1.users.js"
import {appAuth, appOut} from "../utils/auth.js";
const appDasboard = express();
const version = routesVersioning();
appDasboard.use(express.json());




appDasboard.get("/",appAuth, (req,res)=>{
    res.send(req.user)
})
appDasboard.get("/users", appAuth, version(getUsers))


export default appDasboard;