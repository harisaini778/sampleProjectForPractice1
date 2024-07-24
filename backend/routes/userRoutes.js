const userControllers =  require("../controllers/userControllers");

const authenticationMiddleware = require("../auth/auth");

const express = require("express");

const router  = express.Router();

router.post("/login",userControllers.login);

router.post("/signup",userControllers.signup);

router.get("/fetchUsersInfo",authenticationMiddleware,userControllers.fetchUserInfo);

module.exports = router;