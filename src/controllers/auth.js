import validator from "email-validator";
import User from "../models/user.js";
import {hashPassword} from "../helpers/auth.js";
import {nanoid} from "nanoid";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {

    const {email, password} = req.body;

    // validations
    if (!validator.validate(email)) {
        return res.json({error: "A valid Email is required"});
    }

    if (!email?.trim()) {
        return res.json({error: "Email is required"});
    }

    if (!password.trim()) {
        return res.json({error: "Password is required"});
    }

    if (password.length < 6) {
        return res.json({error: "Password must be at least 6 characters"});
    }

    try {
        // check is user exists
        const user = await User.findOne({email});
        if (!user) {
            // Once you set up email sending
            try {
                await sendWelcomeEmail(email);
                const createdUser = await User.create(
                    {
                        email: email,
                        password: await hashPassword(password),
                        username: nanoid(6),
                    });
                const token = jwt.sign({
                    _id: createdUser._id,
                    secret: process.env.SECRET_KEY,
                    expires: {expiresIn: "7d"},
                })

                createdUser.password = undefined;
                res.json({
                    token,
                    user: createdUser
                });
            } catch (err) {
                return res.json({
                    error: "Invalid email. Please use a valid email address",
                })
            }

            return res.json({error: "User not found"});
        } else {
            // compare pwd then login
        }



        // check if pwd is correct
        // Generate token
        // send token to client
    } catch (e) {

    }

}

