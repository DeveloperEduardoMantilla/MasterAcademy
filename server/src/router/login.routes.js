import express from "express";
import passport from "../config/discord-Passport.js";
import { appOut } from "../utils/auth.js";
import {loadEnv } from 'vite'
let env = loadEnv("development", process.cwd(), "VITE")

const  appLogin = express();
appLogin.use(express.json());

appLogin.get("/", appOut, passport.authenticate('discord'));

appLogin.get('/redirect', appOut, passport.authenticate('discord', {
    successRedirect: `http://${env.VITE_IP_FRONTEND}:${env.VITE_PORT_FRONTEND}/dashboard`,
    failureRedirect: `http://${env.VITE_IP_FRONTEND}:${env.VITE_PORT_FRONTEND}/`,
}));
export default appLogin;