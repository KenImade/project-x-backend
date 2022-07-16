const express = require('express')
const router = express.Router()

const {createCustomer, getAllCustomers, getCustomer, updateCustomer, deleteCustomer} = require('../controllers/customerController')
const {protect} = require('../middleware/authMiddleware')


router.post('/', protect, createCustomer)
router.get('/', protect, getAllCustomers)
router.get('/:id', protect, getCustomer)
router.put('/:id', protect, updateCustomer)
router.delete('/:id', protect, deleteCustomer)

module.exports = router;