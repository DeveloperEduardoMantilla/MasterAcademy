//Librerias 
import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session  from "express-session";
import MongoStorage from 'connect-mongo';
import cors from "cors";

//Routes
import login from "./router/login.routes.js"
import appDasboard from "./router/dasboard.routes.js";


//Configuracion
dotenv.config();
let appExpress = express();
appExpress.use(cors())
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
        maxAge:60000*60*24,
        httpOnly: false
    }
}))
appExpress.use(passport.initialize());
appExpress.use(passport.session());

appExpress.use((req,res,next)=>{
    appDasboard.locals.user = req.user;
    next();
})

//Rutas
appExpress.get("/",(req,res)=>{
    res.send({message:"ok"})
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
    res.send({Message:"Es necesario que se encuentre inscrito en el servidor de CampusLands para el acceso a la plataforma"})
})

//Servidor Express 
let config = JSON.parse(process.env.MY_SERVER)
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`)
})