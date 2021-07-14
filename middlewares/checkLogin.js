//external import
const jwt = require('jsonwebtoken')

const checkLogin = (async (req, res, next) => {

    try {
        const { access_token } = req.cookies

        const token = access_token.split(" ")[1]

        jwt.verify(token, process.env.SECRET_KEY)

        next()


    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({
            Error: "Authorization errror!"
        })
    }

})

module.exports = checkLogin