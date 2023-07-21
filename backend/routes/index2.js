import express from "express";

import{
    getAllUsers,
    createUser,
    getUserByUserName,
    updateUser,
    deleteUser,
    forgotPassword,
    resetPasswordGet,
    resetPasswordPost
} from "../controllers/Users.js";

const router2 = express.Router();

router2.get('/', getAllUsers);
router2.post('/login', getUserByUserName);
router2.post('/register', createUser);
router2.patch('/:id', updateUser);
router2.delete('/:id', deleteUser);
router2.post('/forgotPassword', forgotPassword);
router2.get('/resetPassword/:id/:token', resetPasswordGet);
router2.post('/resetPassword/:id/:token', resetPasswordPost);

export default router2;