const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const path = require("path")
const db = require(path.join(__dirname,'..','database.js'))

const protect = asyncHandler( async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.user = await db.promise().query(`SELECT id, firstname, lastname, email, phone_number from users where id = '${decoded.id}'`)

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")
        }
    }

    if(!token) {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

module.exports = {protect}