import express from "express";

const appDasboard = express();
appDasboard.use(express.json());

appDasboard.get('/redirect', passport.authenticate('discord', {
    successRedirect: '/dasboard',
    failureRedirect: '/home',
}));

export default appDasboard;