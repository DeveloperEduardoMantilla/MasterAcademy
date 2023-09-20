import express from "express";
import dotenv from "dotenv";
import {conx} from "./config/atlas.js";
import passport from "passport";

dotenv.config("../../");
let appExpress = express();
appExpress.use(express.json());
appExpress.use(passport.initialize());
appExpress.use(passport.session());

appExpress.get("/login", passport.authenticate('discord'))

let config = JSON.parse(process.env.MY_SERVER)
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`)
})