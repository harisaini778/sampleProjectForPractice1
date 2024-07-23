const dotenv = require("dotenv");

dotenv.config();

const {DataTypes,Sequelize} = require("sequelize");

const sequelize =  new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect:"mysql"
});

const User = sequelize.define("userModel",{
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

module.exports = {sequelize,User}

