import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const getAllUsers = async (req,res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createUser = async (req,res) => {
    try {
        const alreadyExistingEmail = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (alreadyExistingEmail) {
            return res.status(409).json({ message: "Email already registered!" });
        }

        const alreadyExistingUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (alreadyExistingUser) {
            return res.status(409).json({ message: "Username Taken!" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }

    try {
        const { password, username, first_name, last_name, email } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            username: username,
            passwordhash: hashedPassword,
            first_name: first_name,
            last_name: last_name,
            email: email
        });
        const jwtToken = jsonwebtoken.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET
        );
        res.json({ message: "User Created", token: jwtToken, email: email });
    } catch (error){
        res.json({ message: error.message });
    }
}

export const getUserByUserName = async (req,res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                username: userName
            }
        });

        if (!user) {
            return res.status(400).json({ message: "Could not find user with user name!"})
        }
        
        const match = await bcrypt.compare(password, user.passwordhash);

        if (!match) {
            return res.status(400).json({ message: "Incorrect password!"});
        }
        const jwtToken = jsonwebtoken.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET
        );
        res.json({ message: "Welcome back!", token: jwtToken, email: user.email, firstname: user.first_name, lastname: user.last_name });
    } catch (error){
        res.status(400).json({ message: error.message });
    }
}

export const updateUser = async (req,res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({ message: "User Updated" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteUser = async (req,res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ message: "User Deleted" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const forgotPassword = async (req,res) => {
    const { email } = req.body;

    try{
        const oldUser = await User.findOne({
            where: {
                email: email
            }
        });

        if(!oldUser){
            return res.status(400).json({ message: "User does not exist!" });
        }

        const secret = process.env.JWT_SECRET + oldUser.passwordhash;
        const token = jsonwebtoken.sign(
            { email: oldUser.email, id: oldUser.id},
            secret,
            {expiresIn: '5m'}
        );
        const link = `http://localhost:5000/users/resetPassword/${oldUser.id}/${token}`;
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.APP_EMAIL,
              pass: process.env.APP_PASSWORD
            }
          });
          
          var mailOptions = {
            from: 'admin@gmail.com',
            to: 'ha98754@gmail.com',
            subject: 'Reset Password Link',
            text: link
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        res.status(200).json({ message: "Email has been sent!" });
        console.log(link);
    } catch (error){
        res.json({ message: error.message });
    }
}

export const resetPasswordGet = async (req,res) => {
    const { id, token } = req.params;
    console.log(req.params);
    try{
        const oldUser = await User.findOne({
            where: {
                id: id
            }
        });
    
        if(!oldUser){
            return res.status(400).json({ message: "User does not exist!"});
        }
    
        const secret = process.env.JWT_SECRET + oldUser.passwordhash;
    
        try{
            const verify = jsonwebtoken.verify(token, secret);
            res.render("index", { email: verify.email, status: "Not Verified" });
        } catch (error){
            res.status(400).send("Not Verified");
        }
    } catch (error){
        res.json({ message: error.message });
    }
}

export const resetPasswordPost = async (req,res) => {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;
    try{
        const oldUser = await User.findOne({
            where: {
                id: id
            }
        });
    
        if(!oldUser){
            return res.status(400).json({ message: "User does not exist!"});
        }
    
        const secret = process.env.JWT_SECRET + oldUser.passwordhash;
    
        try{
            const verify = jsonwebtoken.verify(token, secret);
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            try{
                await User.update({ passwordhash: hashedPassword } ,{
                    where: {
                        id: id
                    }
                });
                //res.status(200).json({ message: "Password Updated" });

                res.render("index", { email: verify.email, status: "Verified" });
            } catch (error){
                json.status(400).json({ message: "Password reset failed" });
            } 
        } catch (error){
            res.status(400).json({ message: "Not Verified" });
        }
    } catch (error){
        res.json({ message: error.message });
    }
}