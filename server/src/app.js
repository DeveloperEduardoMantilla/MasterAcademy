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
import logout from "../src/router/logout.js";

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
appExpress.use("/login", login);
appExpress.use("/dashboard",appDasboard);
appExpress.use(logout);

appExpress.use("/", (req,res)=>{
    res.send({Message:"Bienvenidos, MasterAcademy cuenta con su propia api para la gestion de contenido, recuerda que es importante estar logueado para poder hacer uso de los diferentes servicios que presta dicha api."})
})

//Servidor Express 
let config = JSON.parse(process.env.MY_SERVER)
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`)
})