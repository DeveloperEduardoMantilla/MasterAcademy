import passport from "passport";
import { Strategy } from "passport-discord";
import { conx } from "./atlas.js";
import dotenv from "dotenv";

dotenv.config()
passport.serializeUser((user, done)=>{
    done(null, user)
})
passport.deserializeUser(async(user, done)=>{
    done(null, user)
})

function buscarNombreEnArray(arr, nombreBuscado) {
    const resultado = arr.find(objeto => objeto.name === nombreBuscado);
    return !!resultado;
}

passport.use(new Strategy({ 
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL : "/auth/redirect",
    scope: ['identify','guilds']
}, async(accessToken,refreshToken,profile,done)=>{
    try{
            let guildName=process.env.NAME_SERVER_DISCORD;
            
            if(!buscarNombreEnArray(profile.guilds, guildName)){
                console.log(`El usuario no pertenece al servidor ${guildName}`);
                return fasle;
            }

            let db= await conx();
            let user =db.collection("user");
            let date = new Date;
            let fecha=date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay()
            let newUser = {
                id:parseInt(profile.id),
                username: profile.username,
                fullName: profile.username,
                loginCount:"1",
                lastLogin:fecha,
                creationDate:fecha,
                roleId:2
            }
            let res = await user.findOne({id:parseInt(profile.id)});
            if(res==null || Object.keys(res).length==0){
                await user.insertOne(newUser);
                done(null, newUser)
            }else{
                let cant = parseInt(res.loginCount)+1;
                let fecha = date.toLocaleString();
                await user.updateOne({id:parseInt(profile.id)},{$set:{loginCount:cant.toString(), lastLogin:fecha.toString()}})
                done(null,res)
            }
        

    }catch(error){
        console.error(error);
    }
}))

export default passport