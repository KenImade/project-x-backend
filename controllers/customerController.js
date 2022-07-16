const asyncHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')
const db = require('../database')

// @desc    Get customers
// @route   GET /api/customers
// @access  Public
const getCustomers = asyncHandler( async (req, res) => {
    const {userId} = req.body;
    res.json({msg: "to be created"})
})

// @desc    Create a customer
// @route   POST /api/customers
// @access  Public
const createCustomer = asyncHandler( async (req, res) => {
    const {} = req.body;
    res.json({msg: "to be created"})
})

// @desc    Delete a customer
// @route   DELETE /api/customers
// @access  Public
const deleteCustomer = asyncHandler( async (req, res) => {
    const {} = req.body;
    res.json({msg: "to be created"})
})

// @desc    Update a customer
// @route   UPDATE /api/customers
// @access  Public
const updateCustomer = asyncHandler( async (req, res) => {
    const {} = req.body;
    res.json({msg: "to be created"})
})


module.exports = {
    getCustomers,
    createCustomer,
    deleteCustomer,
    updateCustomer,
}