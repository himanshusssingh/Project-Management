import {Router} from "express";
import { registerUser, login } from "../controllers/auth.controllers.js";
import {userRegisterValidator, userLoginValidator} from '../validator/index.js';
import {validate} from '../middlewares/validator.middleware.js';

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login)


export default router;