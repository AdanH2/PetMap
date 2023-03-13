import express from "express";

import{
    getAllUsers,
    createUser,
    getUserByUserName,
    updateUser,
    deleteUser
} from "../controllers/Users.js";

const router2 = express.Router();

router2.get('/', getAllUsers);
router2.get('/:userName', getUserByUserName);
router2.post('/', createUser);
router2.patch('/:id', updateUser);
router2.delete('/:id', deleteUser);

export default router2;