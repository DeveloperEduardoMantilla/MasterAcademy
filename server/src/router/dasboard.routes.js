import express from "express";
import passport  from "passport";
import {appAuth, appOut} from "../utils/auth.js";
const appDasboard = express();
appDasboard.use(express.json());

appDasboard.get("/",appAuth, (req,res)=>{
    if(req.user.status>=400){
        res.send(req.user)
    }else{
        res.send(req.user)
    }
})

appDasboard.get('/redirect', appOut, passport.authenticate('discord', {
    successRedirect: '/dasboard',
    failureRedirect: '/home',
}));

export default appDasboard;