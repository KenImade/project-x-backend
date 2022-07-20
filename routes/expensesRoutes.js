const express = require('express')
const path = require("path")
const router = express.Router()

const {
    createExpense, 
    getAllExpenses, 
    getExpense, 
    updateExpense, 
    deleteExpense
} = require(path.join(__dirname,'..','controllers','expensesController.js'))
const {protect} = require(path.join(__dirname,'..','middleware','authMiddleware.js'))

router.post('/', protect, createExpense)
router.get('/', protect, getAllExpenses)
router.get('/:id', protect, getExpense)
router.put('/:id', protect, updateExpense)
router.delete('/:id', protect, deleteExpense)


module.exports = router;