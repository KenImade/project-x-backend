const express = require('express')
const router = express.Router()

const {createCustomer, getCustomers, updateCustomer, deleteCustomer} = require('../controllers/customerController')
const {protect} = require('../middleware/authMiddleware')


router.post('/', protect, createCustomer)
router.get('/', protect, getCustomers)
router.put('/:id', protect, updateCustomer)
router.delete('/:id', protect, deleteCustomer)

module.exports = router;