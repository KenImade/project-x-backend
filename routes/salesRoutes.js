const express = require('express')
const router = express.Router()
const path = require("path")

const {
    createSale, 
    getAllSales, 
    getSale, 
    updateSale, 
    deleteSale
} = require(path.join(__dirname,'..','controllers','salesController.js'))
const {protect} = require(path.join(__dirname,'..','middleware','authMiddleware.js'))

router.post('/', protect, createSale)
router.get('/', protect, getAllSales)
router.get('/:id', protect, getSale)
router.put('/:id', protect, updateSale)
router.delete('/:id', protect, deleteSale)

module.exports = router;