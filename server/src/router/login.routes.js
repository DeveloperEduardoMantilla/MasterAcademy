import express from "express";
import passport from "../config/discord-Passport.js";

const  appAuth = express();
appAuth.use(express.json());

appAuth.get("/", passport.authenticate('discord'));

export default appAuth;