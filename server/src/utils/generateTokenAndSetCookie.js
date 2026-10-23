import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authCookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
};

export const generateTokenAndSetCookie = (res, userId) => {
    try {
        const token = jwt.sign({ userId },config.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("token", token, {
            ...authCookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return token;
    } catch (error) {
        throw error;
    }
};