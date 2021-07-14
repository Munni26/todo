//external import 
const express = require("express");
//internal import
const { addData, getAllData, getSingleData, updateData, deleteData } = require("../controller/todoController");
const checkLogin = require("../middlewares/checkLogin");

const todoRouter = express.Router();


//post/create data
todoRouter.post('/', addData)

//get /read all data
todoRouter.get('/', checkLogin, getAllData)

// get/ read single data
todoRouter.get("/:id", getSingleData)

//update data
todoRouter.put("/:id", updateData)

//delete data
todoRouter.delete("/:id", deleteData)



module.exports = todoRouter;