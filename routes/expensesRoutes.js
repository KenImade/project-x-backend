const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')
const {createExpense, getAllExpenses, getExpense, updateExpense, deleteExpense} = require('../controllers/expensesController')

router.post('/', protect, createExpense)
router.get('/', protect, getAllExpenses)
router.get('/:id', protect, getExpense)
router.put('/:id', protect, updateExpense)
router.delete('/:id', protect, deleteExpense)


module.exports = router;