import passport from "passport";
import { Strategy } from "passport-discord";
import { conx } from "./atlas.js";
import dotenv from "dotenv";

dotenv.config()
passport.serializeUser((user, done)=>{
    done(null, user)
})
passport.deserializeUser((user, done)=>{
    done(null, user)
})

function searchNameInArray(arr, nombreBuscado) {
    const resultado = arr.find(objeto => objeto.name === nombreBuscado);
    return !!resultado;
}

passport.use(new Strategy({ 
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL : "http://localhost:5010/login/redirect",
    scope: ['identify','guilds']
}, async(accessToken,refreshToken,profile,done)=>{
    try{
            let guildName=process.env.NAME_SERVER_DISCORD;
            if(!searchNameInArray(profile.guilds, guildName)){    
                done(null,false)
                return;
            }

            let db= await conx();
            let user =db.collection("user");
            let date = new Date;
            let fecha = date.toLocaleString();
            let res = await user.findOne({id:parseInt(profile.id)});

            if(res==null || Object.keys(res).length==0){
                let newUser = {
                    id:parseInt(profile.id),
                    username: profile.username,
                    fullName: profile.username,
                    loginCount:"1",
                    lastLogin:fecha.toString(),
                    creationDate:fecha.toString(),
                    roleId:2
                }
                await user.insertOne(newUser);
                done(null, newUser)
            }else{
                let cant = parseInt(res.loginCount)+1;
                await user.updateOne({id:parseInt(profile.id)},{$set:{loginCount:cant.toString(), lastLogin:fecha.toString()}})
                done(null,res)
            }
    }catch(error){
        console.error(error);
    }
}))

export default passport