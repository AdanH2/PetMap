import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";

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
        res.json({ message: "Welcome back!", token: jwtToken, email: user.email });
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