import { body } from "express-validator";
const commentRegistration = [

    body("class")
    .notEmpty()
    .withMessage("The class field cannot be empty")
    .isString()
    .withMessage("The class field must be of type string "),

    body("userId")
    .notEmpty()
    .withMessage("The userId field cannot be empty")
    .isString()
    .withMessage("The userId must be a text string"),

    body("comment")
    .notEmpty()
    .withMessage("The comment must cannot be empty")
    .isString()
    .withMessage("The comment must be a text string"),

    body("date")
    .notEmpty()
    .withMessage("The date cannot be empty")
    .isString()
    .withMessage("The date must be a text string"),
];

export { commentRegistration};