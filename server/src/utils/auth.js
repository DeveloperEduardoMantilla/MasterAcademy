import express from "express";

const appAuth = express();
const appOut = express();
appAuth.use(express.json());

appAuth.use((req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.redirect("/home");
    }
})

appOut.use((req,res,next)=>{
    if(req.user){
        res.redirect("/dasboard");
    }else{
        next();
    }
})

export {appAuth,appOut};