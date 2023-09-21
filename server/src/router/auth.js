import express from "express";
import passport from "../config/discord-Passport.js";

const  appAuth = express();

appAuth.use(express.json());

appAuth.get("/login", passport.authenticate('discord'));

appAuth.get('/redirect', passport.authenticate('discord', {
    successRedirect: '/auth/dasboard',
    failureRedirect: '/auth/home',
}));

appAuth.get("/dasboard", (req,res)=>{res.send("Dasboard")})
appAuth.get("/home", (req,res)=>{res.send("Home")})

export default appAuth;