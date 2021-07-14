//external import 
const express = require("express");

//internal import
const { signUp, logIn } = require("../controller/userController");

const userRouter = express.Router();

//signup
userRouter.post('/signup', signUp)

//login
userRouter.post('/login', logIn)

module.exports = userRouter;