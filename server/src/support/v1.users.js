import {getUsersController,getUserIdController} from "../controller/v1/users.controller.js";

let getUsers ={
    "1.0.0": getUsersController
}

let getUserId = {
    "1.0.0": getUserIdController
}

export {
    getUsers,
    getUserId
}