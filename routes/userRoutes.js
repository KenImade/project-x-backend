const express = require('express')
const router = express.Router()
const path = require("path")

const {
    registerUser, 
    loginUser, 
    getCurrentUser
} = require(path.join(__dirname,'..','controllers','userController.js'))
const {protect} = require(path.join(__dirname,'..','middleware','authMiddleware.js'))


router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getCurrentUser)

module.exports = router;