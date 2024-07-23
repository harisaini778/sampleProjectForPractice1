const userControllers =  require("../controllers/userControllers");

const express = require("express");

const router  = express.Router();

router.post("/login",userControllers.login);

router.post("/signup",userControllers.signup);

module.exports = router;