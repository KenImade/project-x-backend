const express = require('express')
const router = express.Router()
const path = require("path")

const {
    createCustomer, 
    getAllCustomers, 
    getCustomer, 
    updateCustomer, 
    deleteCustomer
} = require(path.join(__dirname,'..','controllers','customerController.js'))
const {protect} = require(path.join(__dirname,'..','middleware','authMiddleware.js'))


router.post('/', protect, createCustomer)
router.get('/', protect, getAllCustomers)
router.get('/:id', protect, getCustomer)
router.put('/:id', protect, updateCustomer)
router.delete('/:id', protect, deleteCustomer)

module.exports = router;