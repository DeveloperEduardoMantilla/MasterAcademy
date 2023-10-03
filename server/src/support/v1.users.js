import {getUsersController,getUserIdController, getUserLogoutController, postCourseRegistrationController, getCourseRegistrationController, getValidationRegistredController} from "../controller/v1/users.controller.js";

let getUsers ={
    "1.0.0": getUsersController
}

let getUserId = {
    "1.0.0": getUserIdController
}

let getUserLogout = {
    "1.0.0": getUserLogoutController
}

let postCourseRegistration = {
    "1.0.0": postCourseRegistrationController
}

let getCourseRegistration = {
    "1.0.0": getCourseRegistrationController
}

let getValidationRegistred = {
    "1.0.0": getValidationRegistredController
}

export {
    getUsers,
    getUserId,
    getUserLogout,
    postCourseRegistration,
    getCourseRegistration,
    getValidationRegistred
}