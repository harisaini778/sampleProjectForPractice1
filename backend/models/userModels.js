const db = require("../utils/database");

const {DataTypes} = require("sequelize");

const User = db.define("userModel",{
    id : {
        type:DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement:true
    },
    name : {
         type : DataTypes.STRING,
         unique : true,
         allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
    },
    password:{
        type : DataTypes.STRING,
        unique:true,
        allowNull : false,
    }
});

module.exports = User

