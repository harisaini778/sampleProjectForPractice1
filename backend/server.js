const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const express = require("express");

const db = require("./utils/database");

const app = express();

app.use(express.json()); // body parser used to parse json payloads from react.js modern frontend frameworks

app.use(express.urlencoded({extended:true})); // parses the urlencode form data application/domain.com, generally used in html frontend

app.use(cors({
   origin: "http://localhost:3000/"
}));

app.use("/users",userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, async()=>{
   try {
    await db.authenticate();  // Verifies the database credentials beafore connection
    await db.sync();          // Synchronises the databse and creates the models
    console.log(`Server is running on ${process.env.PORT}`);
   } catch(err) {
    console.log(`err connecting with db : ${err}`);
   }
})


                                            





