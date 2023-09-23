import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import login from "./router/login.routes.js"
import session  from "express-session";
import appDasboard from "./router/dasboard.routes.js";
import MongoStorage from 'connect-mongo';

dotenv.config();
let appExpress = express();
appExpress.use(express.json());

appExpress.use(session({
    secret:process.env.JWT_PRIVATE_KEY,
    name:"MasterAcademy-Session",
    saveUninitialized:false,
    resave:false,
    store: MongoStorage.create({
        mongoUrl: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_CLUSTER}.mongodb.net/${process.env.ATLAS_DB}`
    }),
    cookie:{
        maxAge:60000*60*24
    }
}))

appExpress.use(passport.initialize());
appExpress.use(passport.session());

appExpress.use((req,res,next)=>{
    appDasboard.locals.user = req.user;
    next();
})

appExpress.use("/login", login);

appExpress.use("/logout", (req,res)=>{
    req.logout((err)=>{
        if(err){
            console.error(err);
            return next(err);
        }
    });
    res.redirect('/home');
})

appExpress.use("/dasboard",appDasboard);

appExpress.use("/home", (req,res)=>{
    res.send({Message:"Home page"})
})

let config = JSON.parse(process.env.MY_SERVER)
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`)
})