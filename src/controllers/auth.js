import validator from "email-validator";
import User from "../models/user.js";
import {comparePassword, hashPassword} from "../helpers/auth.js";
import {nanoid} from "nanoid";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {

    const {email, password} = req.body;

    // validations
    if (!validator.validate(email)) {
        return res.json({error: "A valid Email is required"});
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
            // await sendWelcomeEmail(email);
            const createdUser = await User.create(
                {
                    email: email,
                    password: await hashPassword(password),
                    username: nanoid(6),
                });
            const token = jwt.sign(
                {
                    _id: createdUser._id,
                    expires: {expiresIn: "7d"},
                },
                process.env.JWT_SECRET
            )

            createdUser.password = undefined;
            res.json({
                token,
                user: createdUser
            });
        } else {
            // compare pwd then login
            const match = await comparePassword(password, user.password);
            if (!match) {
                return res.json({
                    error: "Password is incorrect"
                });
            } else {
                const token = jwt.sign(
                    {
                        _id: user._id,
                        expires: {expiresIn: "7d"},
                    },
                    process.env.JWT_SECRET
                );

                user.password = undefined;

                res.json({
                    token,
                    user
                });
            }
        }
    } catch (e) {
        console.log("Error occurred", e);
        return res.json({
            error: "Something went wrong"
        });
    }

}

