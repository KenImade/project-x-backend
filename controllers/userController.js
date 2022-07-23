const asyncHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require("path")
const db = require(path.join(__dirname,'..','database.js'))

// @desc    Register new user
// @route   POST /api/users
// @access  Public
// @params  firstname, lastname, email, phoneNumber, password 
const registerUser = asyncHandler( async (req, res) => {
    const {firstname, lastname, email, phoneNumber, password} = req.body

    // validate input
    if (!firstname || !lastname ||!password || !phoneNumber) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    // Check if user exists
    const userExists = await db.promise().query(`SELECT * FROM users WHERE ${email ? 'email' : 'phone_number'} = '${email ?  email : phoneNumber}'`)
    

    if (userExists[0].length !== 0) {
        console.log(userExists[0])
        res.status(400)
        throw new Error("User already exists")
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        res.status(200)
        await db.promise().query(
            `INSERT INTO users (firstname, lastname, email, phone_number, password) 
            VALUES('${firstname}', '${lastname}', '${email}', '${phoneNumber}', '${hashedPassword}')
        `)
        const user = await db.promise().query(`SELECT * FROM users WHERE email='${email}'`)
        res.json({
            msg: "User has been created", 
            token: generateToken(user[0][0].id)
        })
    }
})

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
// @params  email, phoneNumber, password
const loginUser = asyncHandler( async (req, res) => {
    const userCredentials = req.body;

    if ((!userCredentials.email && !userCredentials.phoneNumber) || !userCredentials.password) {
        res.status(400)
        throw new Error("Invalid credentials")
    }

    const user = await db.promise().query(
        `SELECT * FROM users WHERE ${userCredentials.email ? 'email': 'phone_number'} 
        ='${userCredentials.email ? userCredentials.email : userCredentials.phoneNumber}'
    `)

    if (user && (await bcrypt.compare(userCredentials.password, user[0][0].password))) {
        res.status(200)
        res.json({
            id: user[0][0].id,
            name: user[0][0].firstname,
            email: user[0][0].email,
            phoneNumber: user[0][0].phone_number,
            token: generateToken(user[0][0].id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

// @desc    Get logged in user
// @route   GET /api/users/me
// @access  Private
const getCurrentUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        user: req.user[0][0]
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}


module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
}
