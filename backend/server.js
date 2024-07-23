const dotenv = require("dotenv");


dotenv.config();

const express = require("express");

const {sequelize} = require("./models/userModels");

const app = express();

app.use(express.json()); // body parser used to parse json payloads from react.js moder frontend frameworks

app.use(express.urlencoded({extended:true})); // parses the urlencode form data application/domain.com, generally used in html frontend


const port = process.env.PORT || 5000;

app.listen(port, async()=>{
   try {
    await sequelize.authenticate();  // Verifies the database credentials beafore connection
    await sequelize.sync();          // Synchronises the databse and creates the models
    console.log(`Server is running on ${process.env.PORT}`);
   } catch(err) {
    console.log(`err connecting with db : ${err}`);
   }
})


                                            





