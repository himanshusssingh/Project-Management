import {body} from 'express-validator';
import { AvailableUserRole } from '../utils/constants.js';

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required!")
            .isEmail()
            .withMessage("Invalid Email!"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required!")
            .isLowercase()
            .withMessage("Username must be in lowercase!")
            .isLength({min: 3})
            .withMessage("Username must be atleast 3 character long!"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is Required!"),
        body("fullName")
            .optional()
            .trim(),
    ];
};



export {
    userRegisterValidator
}