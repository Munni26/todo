//external import
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const User = require('../model/userModel');

//signup
const signUp = (async (req, res, next) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            userName: req.body.userName,
            password: hashedPassword
        })
        await newUser.save()
        res.status(200).json({
            Message: "Sign up successfull"
        })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({
            Message: "Signup failed"
        })
    }
});

//login
const logIn = (async (req, res) => {
    try {
        const user = await User.findOne({ $or: [{ userName: req.body.userName }, { name: req.body.name }] })
        if (user) {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            if (isPasswordValid) {
                //generate token
                const token = jwt.sign({
                    userName: user.userName,
                    name: user.name


                }, process.env.SECRET_KEY, {
                    expiresIn: '1h'
                })
                res
                    .status(201)
                    .cookie('access_token', 'Bearer ' + token, {
                        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
                    })

                res.send("login successfully")
                // res.status(200).json({
                //     token,
                // })
            }
        }
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({
            error: "Authentication failed"
        })
    }
})




module.exports = { signUp, logIn }