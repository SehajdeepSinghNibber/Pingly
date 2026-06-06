import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateTokenAndSetCookie = (userId,res) =>{
    const token = jwt.sign({userId},config.JWT_SECRET,{
        expiresIn: '15d'
    })

    res.cookie("jwt",token,{
        maxAge : 15*24*60*60*1000, //millisecond format
        httpOnly: true, // prevents XSS attacks which is cross-site scripting attacks
        sameSite: "strict" //prevents CSRF attacks cross-site request fogery attacks
    })
}

export default generateTokenAndSetCookie;