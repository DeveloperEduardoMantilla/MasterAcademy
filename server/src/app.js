import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import login from "./router/login.routes.js"
import session  from "express-session";
import appDasboard from "./router/dasboard.routes.js";

dotenv.config();
let appExpress = express();
appExpress.use(express.json());

appExpress.use(session({
    secret:process.env.JWT_PRIVATE_KEY,
    saveUninitialized:false,
    resave:false 
}))

appExpress.use(passport.initialize());
appExpress.use(passport.session());
appExpress.use("/login", login)
appExpress.use("/dasboard",appDasboard)
appExpress.use("/home", (req,res)=>{
    res.send("Hola Mundo, Home")
})

let config = JSON.parse(process.env.MY_SERVER)
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`)
})