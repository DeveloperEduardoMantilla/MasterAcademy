//Librerias 
import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session  from "express-session";
import MongoStorage from 'connect-mongo';
import cors from "cors";
import {loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
let env = loadEnv("development", process.cwd(), "VITE")

//Routes
import login from "./router/login.routes.js"
import appDasboard from "./router/dasboard.routes.js";
import logout from "../src/router/logout.js";

//Configuracion
dotenv.config();
let appExpress = express();
appExpress.use(cors({
    origin: `http://${env.VITE_IP_FRONTEND}:${env.VITE_PORT_FRONTEND}`,
    credentials: true
  }))
appExpress.use(express.json());
appExpress.use(session({
    secret:env.VITE_JWT_PRIVATE_KEY,
    name:"MasterAcademy-Session",
    saveUninitialized:false,
    resave:false,
    store: MongoStorage.create({
        mongoUrl: `mongodb+srv://${env.VITE_ATLAS_USER}:${env.VITE_ATLAS_PASSWORD}@${env.VITE_ATLAS_CLUSTER}.mongodb.net/${env.VITE_ATLAS_DB}`
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
appExpress.use((req, res, next) => {
    console.log('Requested URL:', req.url);
    next();
  });
  
//Rutas
appExpress.use("/login", login);
appExpress.use("/dashboard",appDasboard);
appExpress.use(logout);
appExpress.use("/", (req,res)=>{
    res.send({Message:"Bienvenidos, MasterAcademy cuenta con su propia api para la gestion de contenido, recuerda que es importante estar logueado para poder hacer uso de los diferentes servicios que presta dicha api."})
})

const ipBackEnd = env.VITE_IP_BACKEND;
const portBackEnd = env.VITE_PORT_BACKEND;

//Servidor Express 
appExpress.listen((ipBackEnd,portBackEnd), ()=>{
    console.log(`http://${ipBackEnd}:${portBackEnd}`)
})