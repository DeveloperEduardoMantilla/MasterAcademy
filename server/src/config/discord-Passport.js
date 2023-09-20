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
passport.use(new Strategy({ 
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL : "http://localhost:5010/auth/redirect",
    scope: ['identify','guilds']
}, async(accessToken,refreshToken,profile,done)=>{
    try{
        let db= await conx();
        let user =db.collection("user");
    
        let newUser = {
            id:parseInt(profile.id),
            username: profile.username,
            fullName: profile.global_name,
            loginCount:"1",
            lastLogin:"0000-00-00",
            email: "eduardoma876@gmail.com",
            creationDate:"2023-10-15",
            roleId:1
        }
        await user.insertOne(newUser);
        done(null, newUser)

    }catch(error){
        console.error(error.errInfo.details.schemaRulesNotSatisfied[0]);
    }
}))

export default passport