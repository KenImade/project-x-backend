const asyncHandler = require("express-async-handler")
const db = require('../database')

// @desc    Get customers
// @route   GET /api/customers
// @access  Public
const getAllCustomers = asyncHandler( async (req, res) => {
    const {id} = req.user[0][0];

    if (!id) {
        res.status(400)
        throw new Error("User is not authorized")
    }
    
    const customers = await db.promise().query(`
        SELECT * FROM customers WHERE user_id = ${id} 
    `)
    
    if (customers[0][0]) {
        res.status(200).json({total: customers[0].length, customers: customers[0]})
    } else {
        res.status(400)
    }
})

// @desc    Create a customer
// @route   POST /api/customers
// @access  Public
const createCustomer = asyncHandler( async (req, res) => {
    const {id} = req.user[0][0];
    const {name, address, email, phoneNumber} = req.body;

    // TODO: Check if customer exists with the same user
    const customer = await db.promise().query(
        `SELECT phone_number from customers WHERE user_id = ${id}`
    )

    if (customer) {
        res.status(400)
        throw new Error("Customer already exists for this user")
    }

    if (!name || !phoneNumber || !id) {
        res.status(400)
        throw new Error("Invalid request")
    } else {
        await db.promise().query(
            `INSERT INTO customers (name, address, email, phone_number, user_id)
            VALUES('${name}','${address}','${email}','${phoneNumber}','${id}' )
        `)
        res.status(201)
        res.json({msg: "Customer created"})
    }
})

// @desc    Get a customer
// @route   GET /api/customers/:id
// @access  Public
const getCustomer = asyncHandler(async (req, res) => {
    const customer = await db.promise().query(`
        SELECT * FROM customers where id = '${req.params.id}'
    `)

    if (customer[0].length === 0) {
        res.status(400)
        throw new Error("Customer not found")
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the user_id in customer
    if (customer[0][0].user_id !== req.user[0][0]) {
        res.status(401)
        throw new Error("User not authorized")
    }

    res.status(200).json(customer[0][0])
})

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Public
const deleteCustomer = asyncHandler( async (req, res) => {
    const customer = await db.promise().query(`
        SELECT * FROM customers where id = '${req.params.id}'
    `)

    if (customer[0].length === 0) {
        res.status(400)
        throw new Error("Customer not found")
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the user_id in customer
    if (customer[0][0].user_id !== req.user[0][0]) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await db.promise.query(`
        DELETE FROM customers WHERE id=${req.params.id}
    `)

    res.status(200).json({id: req.params.id})
})

// @desc    Update a customer
// @route   UPDATE /api/customers
// @access  Public
const updateCustomer = asyncHandler( async (req, res) => {
    const {name, address, email, phoneNumber} = req.body;

    const customer = await db.promise().query(`
        SELECT * FROM customers where id = '${req.params.id}'
    `)

    if (customer[0].length === 0) {
        res.status(400)
        throw new Error("Customer not found")
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the user_id in customer
    if (customer[0][0].user_id !== req.user[0][0].id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await db.promise().query(`
        UPDATE customers 
        SET name='${name}', 
            address='${address}', 
            email='${email}', 
            phone_number='${phoneNumber}'
        WHERE id=${req.params.id}
    `)

    res.status(201).json({id: req.params.id})
})


module.exports = {
    getAllCustomers,
    createCustomer,
    getCustomer,
    deleteCustomer,
    updateCustomer,
}