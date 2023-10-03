import express from "express";
import passport  from "passport";
import routesVersioning from "express-routes-versioning";
import {getUsers, getUserId, getUserLogout, postCourseRegistration,getCourseRegistration} from "../support/v1.users.js"
import {appAuth, appOut} from "../utils/auth.js";
import appValidateId from "../middlewares/validateId.js";
import {registrationCourse} from "../storage/dto.courses.js";
import {verifyDTO} from "../middlewares/DTO/validator-errors.js"

const appDasboard = express();
const version = routesVersioning();
appDasboard.use(express.json());


appDasboard.get("/",appAuth, (req,res)=>{
    res.send({message:`User logged in ${req.user.username} with the role of ${req.rol=2?"Administrator":"Student"}`})
})

appDasboard.get("/users", appAuth,  version(getUsers))
appDasboard.get("/user/:id", appAuth, appValidateId, version(getUserId))
appDasboard.get("/userLogout", appAuth, version(getUserLogout))
appDasboard.post("/courseregistration", registrationCourse, verifyDTO, appAuth, version(postCourseRegistration));
appDasboard.get("/courseregistration/:userId", version(getCourseRegistration))


export default appDasboard;