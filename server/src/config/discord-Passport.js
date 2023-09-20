import passport from "passport";
import { Strategy } from "passport-discord";
import dotenv from "dotenv";

dotenv.config("../../../")

passport.serializeUser()
passport.deserializeUser()
passport.use(new Strategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL : '/auth/redirect',
    scope: ['identify','guilds']
}, (accessToken,refreshToken,profile,done)=>{

    console.log(profile);

    done(null, new)
}))