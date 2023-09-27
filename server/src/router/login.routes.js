import express from "express";
import passport from "../config/discord-Passport.js";
import { appOut } from "../utils/auth.js";

const  appLogin = express();
appLogin.use(express.json());

appLogin.get("/", appOut, passport.authenticate('discord'));

appLogin.get('/redirect', appOut, passport.authenticate('discord', {
    successRedirect: `http://localhost:5173/dashboard`,
    failureRedirect: `http://localhost:5173/`,
}));
export default appLogin;