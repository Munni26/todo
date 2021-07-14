//internal import

const Todo = require("../model/todoModel");

// post/create data functionality
const addData = (async (req, res, next) => {
    try {
        const todo = new Todo(req.body)
        await todo.save()
        res.status(200).json({
            success: "Todo post successfully!"
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: "Todo post failed!"
        });
    }
});

// get/read all data functionality
const getAllData = (async (req, res, next) => {
    try {
        const data = await Todo.find({}, { __v: 0 })
        res.status(200).json({
            Data: data
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: "Data found failed!"
        });
    }
});

// get/read single data functionality

const getSingleData = (async (req, res, next) => {
    try {
        const data = await Todo.findOne({ _id: req.params.id }, { __v: 0 })
        res.status(200).json({
            Data: data
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: "Data found failed!"
        });
    }
});

//update data functionality
const updateData = (async (req, res, next) => {
    try {
        await Todo.updateOne({ _id: req.params.id }, { status: req.body.status })
        res.status(200).json({
            success: "Updated successfully!"
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: "Data update failed!"
        });
    }

})

//delete data functionality
const deleteData = (async (req, res, next) => {
    try {
        await Todo.deleteOne({ _id: req.params.id })
        res.status(200).json({
            success: "Deleted successfully"
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: "Data deletation failed!"
        });
    }
})







module.exports = { addData, getAllData, getSingleData, updateData, deleteData }