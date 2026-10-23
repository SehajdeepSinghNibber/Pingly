import jwt from "jsonwebtoken";
import config from "../config/config.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User doesn't have token",
      });
    }

    const verifyToken = jwt.verify(token, config.JWT_SECRET);

    if (!verifyToken) {
      return res.status(401).json({
        success: false,
        message: "User Doesn't have a valid token",
      });
    }

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default isAuth;
