import express from "express";
import passport from "../config/discord-Passport.js";
import { appOut } from "../utils/auth.js";

const  appLogin = express();
appLogin.use(express.json());

appLogin.get("/", appOut, passport.authenticate('discord'));

export default appLogin;