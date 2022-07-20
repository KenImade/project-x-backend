const path = require("path")
const asyncHandler = require("express-async-handler")
const db = require(path.join(__dirname,'..','database.js'))

// @desc    Get customers
// @route   GET /api/customers
// @access  Private
const getAllCustomers = asyncHandler( async (req, res) => {
    const {id} = req.user[0][0];
    
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
// @access  Private
// @params name, address, email, phoneNumber
const createCustomer = asyncHandler( async (req, res) => {
    const {id} = req.user[0][0];
    const {name, address, email, phoneNumber} = req.body;

    const customer = await db.promise().query(
        `SELECT phone_number from customers WHERE user_id = ${id}
         AND phone_number = ${phoneNumber}
        `
    )

    if (customer[0].length !== 0) {
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
// @access  Private
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
    if (customer[0][0].user_id !== req.user[0][0].id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    res.status(200).json(customer[0][0])
})

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private
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
    if (customer[0][0].user_id !== req.user[0][0].id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await db.promise().query(`
        DELETE FROM customers WHERE id=${req.params.id}
        AND user_id=${req.user[0][0].id}
    `)

    res.status(202).json({
        id: req.params.id,
        msg: "Customer has been deleted"
    })
})

// @desc    Update a customer
// @route   UPDATE /api/customers
// @access  Public
// @params  name, address, email, phoneNumber
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
        AND user_id=${req.user[0][0].id}
    `)

    res.status(201).json({
        id: req.params.id,
        msg: "Customer info has been updated"
    })
})


module.exports = {
    getAllCustomers,
    createCustomer,
    getCustomer,
    deleteCustomer,
    updateCustomer,
}