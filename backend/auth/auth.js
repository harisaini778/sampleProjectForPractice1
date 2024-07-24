const dotenv = require("dotenv");

dotenv.config();

const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    const token =  req.headers.authorization ? req.headers.authorization.split(" ")[1] : false;

    if(!token) {
       res.status(401).json({message:"No token has been provided"});
       // 401 means authorization failed
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{

        if(err) {
            res.status(403).json({message:"Token is not valid"});
            // 403 means forbidden, server understands the req but refuses to authorize it
        };

        req.user = decoded;

        console.log("req.user is : ",req.user);

        next();

    });

}

module.exports = auth;



