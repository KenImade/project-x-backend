const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')
const {createSale, getAllSales, getSale, updateSale, deleteSale} = require('../controllers/salesController')

router.post('/', protect, createSale)
router.get('/', protect, getAllSales)
router.get('/:id', protect, getSale)
// router.put('/:id', protect, updateSale)
router.delete('/:id', protect, deleteSale)

module.exports = router;