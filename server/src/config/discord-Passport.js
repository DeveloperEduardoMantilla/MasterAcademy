import passport from "passport";
import { Strategy } from "passport-discord";
import { conx } from "./atlas.js";
import dotenv from "dotenv";
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

dotenv.config()
let env = loadEnv("development", process.cwd(), "VITE")

const ipBackEnd = import.meta.env.VITE_IP_BACKEND;
const portBackEnd = import.meta.env.VITE_PORT_BACKEND;
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
    clientID: env.VITE_DISCORD_CLIENT_ID,
    clientSecret: env.VITE_DISCORD_CLIENT_SECRET,
    callbackURL : `http://${ipBackEnd}:${portBackEnd}/login/redirect`,
    scope: ['identify','guilds']
}, async(accessToken,refreshToken,profile,done)=>{
    try{
            let guildId=env.VITE_ID_SERVER_DISCORD;
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
                    id:profile.id,
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