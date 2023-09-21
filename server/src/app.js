import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import auth from "./router/auth.js"
import session  from "express-session";


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
appExpress.use("/auth", auth)


let config = JSON.parse(process.env.MY_SERVER)
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`)
})