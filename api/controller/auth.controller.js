
import User from "../models/user.model.js"
import bcryptjs from "bcrypt"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res, next ) =>{
    // console.log(req.body);

    const {username, email, password} =  req.body;

    const hashedPassword = bcryptjs.hashSync(password, 15);
    const newUser = new User({
        username : username, 
        email : email, 
        password : hashedPassword
    })

    // console.log(newUser);

    try {
        await newUser.save();
        res.status(201).send({
            message : "new user created"
        });
    } catch (error) {
        next(error);
    }
}

export const signin  = async(req, res, next) =>{
    const {email, password} = req.body;

    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, "User not found!"));

        // console.log("findOne woking");
        const validPassword =  bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(402, "Wrong credentials!"));
        // console.log("valid Password woking");
        
        // console.log("valid Password woking");
        const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET)

        const {password : pas, ...rest} = validUser._doc;
        res.cookie('token', token, {httpOnly : true}).status(200).json(rest);
        // return validUser;

    } catch (error) {
        // console.log(error.message);
        next(error);
    }

}