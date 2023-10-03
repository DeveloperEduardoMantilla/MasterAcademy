import {getUsersController,getUserIdController, getUserLogoutController, postCourseRegistrationController, getCourseRegistrationController, getValidationRegistredController, getRequestCoursesController} from "../controller/v1/users.controller.js";

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

let getRequestCourses = {
    "1.0.0": getRequestCoursesController
}

export {
    getUsers,
    getUserId,
    getUserLogout,
    postCourseRegistration,
    getCourseRegistration,
    getValidationRegistred,
    getRequestCourses
}