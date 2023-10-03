import { body } from "express-validator";
const registrationCourse = [

    body("course")
    .notEmpty()
    .withMessage("The course field cannot be empty")
    .isString()
    .withMessage("The course field must be of type string "),

    body("date")
    .notEmpty()
    .withMessage("The date field cannot be empty")
    .isString()
    .withMessage("The date must be a text string"),

    body("state")
    .notEmpty()
    .withMessage("The state must cannot be empty")
    .isString()
    .withMessage("The state must be a text string"),

    body("userId")
    .notEmpty()
    .withMessage("The userId cannot be empty")
    .isString()
    .withMessage("The userId must be a text string"),

    body("adminId")
    .optional()
    .isString()
    .withMessage("The adminId must be a text string"),

    body("observation")
    .optional()
    .isString()
    .withMessage("The observation must be a text string"),

    body("notification")
    .optional()
    .isString()
    .withMessage("The notification must be a text string"),    
];

export { registrationCourse};