const asyncHandler = require("express-async-handler")
const db = require('../database')


// @desc    Get expenses   
// @route   GET /api/expenses
// @access  Public
const getAllExpenses = asyncHandler( async (req, res) => {
    const {id} = req.user[0][0];

    const expenses = await db.promise().query(`
        SELECT * FROM expenses WHERE user_id = ${id} 
    `)
    
    if (expenses[0].length > 0) {
        res.status(200).json({total: expenses[0].length, expenses: expenses[0]})
    } else {
        res.status(200).json({msg: "No expenses found"})
    }
})

// @desc    Create an expense
// @route   POST /api/expenses
// @access  Public
const createExpense = asyncHandler( async (req, res) => {
    const {id} = req.user[0][0];
    const {description, amount, customerId} = req.body;


    if (!amount || !customerId || !id) {
        res.status(400)
        res.json({msg: "Invalid request"})
        return;
    } 
    
    await db.promise().query(
        `INSERT INTO expenses (user_id, description, amount, customer_id)
        VALUES('${id}','${description}','${amount}','${customerId}')
    `)
    
    res.status(200).json({msg: "Expense has been added"})
})

// @desc    Get an expense
// @route   GET /api/expenses/:id
// @access  Public
const getExpense = asyncHandler(async (req, res) => {
    const expense = await db.promise().query(`
        SELECT * FROM expenses where id = '${req.params.id}'
    `)

    // Check if expense exists
    if (expense[0].length === 0) {
        res.status(400)
        throw new Error("Expense not found")
    }

    // Check for user
    if(!req.user[0][0]) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the user_id in customer
    if (expense[0][0].user_id !== req.user[0][0].id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    res.status(200).json({expense: expense[0][0]})
})

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Public
const deleteExpense = asyncHandler( async (req, res) => {
    const expense = await db.promise().query(`
        SELECT * FROM expenses where id = '${req.params.id}'
    `)

    if (expense[0].length === 0) {
        res.status(400)
        throw new Error("Expense not found")
    }

    // Check for user
    if(!req.user[0][0]) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the user_id in customer
    if (expense[0][0].user_id !== req.user[0][0].id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await db.promise().query(`
        DELETE FROM expenses WHERE id=${req.params.id} AND
        user_id = ${req.user[0][0].id}
    `)

    res.status(200).json({id: req.params.id})
})

// @desc    Update an expense
// @route   UPDATE /api/expenses/:id
// @access  Public
const updateExpense = asyncHandler( async (req, res) => {
    const {description, amount} = req.body;

    const expense = await db.promise().query(`
        SELECT * FROM expenses where id = '${req.params.id}'
    `)

    if (expense[0].length === 0) {
        res.status(400)
        throw new Error("Expense not found")
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the user_id in customer
    if (expense[0][0].user_id !== req.user[0][0].id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await db.promise().query(`
        UPDATE expenses 
        SET description='${description}', amount='${amount}'
        WHERE id=${req.params.id} AND user_id = ${req.user[0][0].id}
    `)

    res.status(201).json({
        id: req.params.id,
        msg: "Expense has been updated"
    })
})


module.exports = {
    getAllExpenses,
    createExpense,
    getExpense,
    deleteExpense,
    updateExpense,
}