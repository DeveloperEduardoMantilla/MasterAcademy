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

function searchidInArray(arr, idSearch) {
    const resultado = arr.find(objeto => objeto.id === idSearch);
    return !!resultado;
}

passport.use(new Strategy({ 
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL : "http://localhost:5010/login/redirect",
    scope: ['identify','guilds']
}, async(accessToken,refreshToken,profile,done)=>{
    try{
            let guildId=process.env.ID_SERVER_DISCORD;
            if(!searchidInArray(profile.guilds, guildId)){    
                done(null,false)
                return;
            }

            let db= await conx();
            let user =db.collection("user");
            let date = new Date;
            let fecha = date.toLocaleString();
            let res = await user.findOne({id:profile.id});

            if(res==null || Object.keys(res).length==0){
                let newUser = {
                    id:parseInt(profile.id),
                    username: "@"+profile.username, 
                    loginCount:1,
                    lastLogin:fecha.toString(),
                    creationDate:fecha.toString(),
                    role:1,
                    state:1,
                    profile:"https://cdn.discordapp.com/avatars/"+profile.id+"/"+profile.avatar+".png"
                }
                await user.insertOne(newUser);
                done(null, newUser)
            }else{
                let cant = parseInt(res.loginCount)+1;
                await user.updateOne({id:profile.id},{$set:{loginCount:cant, lastLogin:fecha.toString()}})
                done(null,res)
            }
    }catch(error){
        console.error(error);
    }
}))

export default passport