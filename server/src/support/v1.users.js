import {getUsersController,getUserIdController, getUserLogoutController} from "../controller/v1/users.controller.js";

let getUsers ={
    "1.0.0": getUsersController
}

let getUserId = {
    "1.0.0": getUserIdController
}

let getUserLogout = {
    "1.0.0": getUserLogoutController
}


export {
    getUsers,
    getUserId,
    getUserLogout
}