import express from "express";
import passport  from "passport";
import {appAuth, appOut} from "../utils/auth.js";
const appDasboard = express();
appDasboard.use(express.json());

appDasboard.get("/",appAuth, (req,res)=>{
    res.send(req.user)
})
appDasboard.get("/settings",appAuth, (req,res)=>{
    res.send({message:req.user})
})
appDasboard.get('/redirect', appOut, passport.authenticate('discord', {
    successRedirect: '/dasboard',
    failureRedirect: '/home',
}));



export default appDasboard;