import {User} from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-responce.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailgenContent, forgotPasswordMailgenContent, sendEmail } from "../utils/mail.js";
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};
    }
    catch (err) {
        throw new ApiError(500, "Something went wrong while generating access or refresh token.");
    }
}


const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;

    const existedUser = await User.findOne({$or: [{username}, {email}]});

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist!", []);
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false,
    });

    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({validateBeforeSave: false});

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email.",
        mailgenContent: emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
        ),
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry",);

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering a user.");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
            200, {user: createdUser}, "User registered successfully and verification email has been sent on your email.",
        ),
      );
});


const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if(!email){
        throw new ApiError(400, "Email is not found.")
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(400, "User not found.")
    }

    const isPasswordValid = user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(400, "Password is incorrect.")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id,);

      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
      );
    
      const options = {
        httpOnly: true,
        secure: true
      }

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in succesfully."
            ),
        )
});




export {
    registerUser,
    login
}