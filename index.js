//external import 
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//internal import
const todoRouter = require("./router/todoRouter");
const userRouter = require("./router/userRouter");

//create server app
const app = express();
dotenv.config();

//database connection with mongoose 
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("db-connected"))
    .catch(err => console.log(err.message))

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//router
app.use("/todo", todoRouter);
app.use("/user", userRouter);

//default erro handler
const errorHandler = (err, req, res, next) => {
    if (res.headerSent) {
        return next(err)
    }
    res.status(500).json({
        error: err
    });

};
app.use(errorHandler);

//server listing port
app.listen(process.env.PORT, () => {
    console.log(`server is listening at ${process.env.PORT}`)
})
