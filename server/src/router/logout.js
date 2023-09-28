import express from "express";

const appLogout = express();
appLogout.use(express.json());

appLogout.get("/logout", (req,res)=>{
    req.logout(()=>{
        res.redirect('/');
    });
})

export default appLogout;