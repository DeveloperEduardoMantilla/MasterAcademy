import express from "express";

const appAuth = express();
const appOut = express();
appAuth.use(express.json());

appAuth.use((req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.redirect("/");
    }
})

appOut.use((req,res,next)=>{
    if(req.user){
        res.redirect("/dashboard");
    }else{
        next();
    }
})

export {appAuth,appOut};