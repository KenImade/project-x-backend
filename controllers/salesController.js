const asyncHandler = require("express-async-handler")
const path = require("path")
const db = require(path.join(__dirname,'..','database.js'))



// @desc    Get sales   
// @route   GET /api/sales
// @access  Private
const getAllSales = asyncHandler( async (req, res) => {
    const {id} = req.user[0][0];

    const sales = await db.promise().query(`
        SELECT * FROM sales WHERE user_id = ${id} 
    `)
    
    if (sales[0].length > 0) {
        res.status(200).json({total: sales[0].length, sales: sales[0]})
    } else {
        res.status(404)
        throw new Error("No sales found")
    }
})

// @desc    Create a sale
// @route   POST /api/sales
// @access  Private
// @params  description, amount, transactionDate, customerId
const createSale = asyncHandler( async (req, res) => {
    const {id} = req.user[0][0];
    const {description, amount, transactionDate, customerId} = req.body;

    if (!id) {
        res.status(400)
        throw new Error("User cannot be found")
    }

    if (!amount || !customerId || !transactionDate || !id) {
        res.status(400)
        throw new Error("Invalid request")
    } else {
        await db.promise().query(
            `INSERT INTO sales (user_id, description, amount, transaction_date, customer_id)
            VALUES('${id}','${description}','${amount}','${transactionDate}','${customerId}')
        `)
        res.status(200).json({msg: "Sale has been added"})
    }
})

// @desc    Get a sale
// @route   GET /api/sales/:id
// @access  Private
const getSale = asyncHandler(async (req, res) => {
    const sale = await db.promise().query(`
        SELECT * FROM sales where id = '${req.params.id}'
    `)

    // Check if sale exists
    if (sale[0].length === 0) {
        res.status(400)
        throw new Error("Sale not found")
    }

    // Check for user
    if(!req.user[0][0]) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the user_id in customer
    if (sale[0][0].user_id !== req.user[0][0].id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    res.status(200).json({sale: sale[0][0]})
})

// @desc    Update a sale
// @route   UPDATE /api/sales/:id
// @access  Private
// @params  description, amount
const updateSale = asyncHandler( async (req, res) => {
    const {description, amount, transactionDate, customerId} = req.body;

    if (!description || !amount || !transactionDate || !customerId) {
        res.status(400)
        throw new Error("Invalid parameters")
    }

    const sale = await db.promise().query(`
        SELECT * FROM sales where id = '${req.params.id}'
    `)

    if (sale[0].length === 0) {
        res.status(400)
        throw new Error("Customer not found")
    }

    // Check for user
    if(!req.user[0][0]) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the user_id in customer
    if (sale[0][0].user_id !== req.user[0][0].id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await db.promise.query(`
        UPDATE sales 
        SET description='${description}', amount='${amount}',transaction_date = '${transactionDate}', customer_id='${customerId}'
        WHERE id=${req.params.id} AND user_id = ${req.user[0][0].id}
    `)

    res.status(200).json({id: req.params.id, msg: "Sale has been updated"})
})

// @desc    Delete a sale
// @route   DELETE /api/sales/:id
// @access  Private
const deleteSale = asyncHandler( async (req, res) => {
    const sale = await db.promise().query(`
        SELECT * FROM sales where id = '${req.params.id}'
    `)

    if (sale[0].length === 0) {
        res.status(400)
        throw new Error("Sale not found")
    }

    // Check for user
    if(!req.user[0][0]) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the user_id in customer
    if (sale[0][0].user_id !== req.user[0][0].id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await db.promise.query(`
        DELETE FROM sales WHERE id=${req.params.id}
        AND user_id = ${req.user[0][0].id}
    `)

    res.status(200).json({
        id: req.params.id,
        msg: "Sale has been deleted"
    })
})


module.exports = {
    getAllSales,
    createSale,
    getSale,
    updateSale,
    deleteSale
}