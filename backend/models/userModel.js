import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    username:{
        type: DataTypes.STRING
    },
    passwordhash:{
        type: DataTypes.STRING
    },
    salt:{
        type: DataTypes.STRING
    },
    first_name:{
        type: DataTypes.STRING
    },
    last_name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

export default User;