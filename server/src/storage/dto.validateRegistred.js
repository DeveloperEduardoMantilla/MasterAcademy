import { body } from "express-validator";
const validateRegistred = [
    body("userId")
    .notEmpty()
    .withMessage("The userId field cannot be empty"),

    body("course")
    .notEmpty()
    .withMessage("The course field cannot be empty")
];

export { validateRegistred};