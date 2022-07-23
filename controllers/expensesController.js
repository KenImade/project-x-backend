const asyncHandler = require("express-async-handler")
const path = require("path")
const db = require(path.join(__dirname,'..','database.js'))


// @desc    Get expenses   
// @route   GET /api/expenses
// @access  Private
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
// @access  Private
// @params  description, amount, customerId
const createExpense = asyncHandler( async (req, res) => {
    const {id} = req.user[0][0];
    if (!id) {
        res.status(400)
        throw new Error("User cannot be found")
    }

    const {description, amount, transactionDate, customerId} = req.body;


    if (!amount || !customerId || !transactionDate || !id) {
        res.status(400)
        throw new Error("Invalid request")
    } 
    
    await db.promise().query(
        `INSERT INTO expenses (user_id, description, amount, transaction_date, customer_id)
        VALUES('${id}','${description}','${amount}','${transactionDate}','${customerId}')
    `)
    
    res.status(200).json({msg: "Expense has been added"})
})

// @desc    Get an expense
// @route   GET /api/expenses/:id
// @access  Private
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

// @desc    Update an expense
// @route   UPDATE /api/expenses/:id
// @access  Private
// @params  description, amount
const updateExpense = asyncHandler( async (req, res) => {
    const {description, amount, transactionDate, customerId} = req.body;

    if (!description || !amount || !transactionDate || !customerId) {
        res.status(400)
        throw new Error("Invalid parameters")
    }

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
        UPDATE expenses 
        SET description='${description}', amount='${amount}'
        WHERE id=${req.params.id} AND user_id = ${req.user[0][0].id}
    `)

    res.status(201).json({
        id: req.params.id,
        msg: "Expense has been updated"
    })
})

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
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

    res.status(200).json({
        id: req.params.id,
        msg: "Expense has been deleted"
    })
})

module.exports = {
    getAllExpenses,
    createExpense,
    getExpense,
    updateExpense,
    deleteExpense
}