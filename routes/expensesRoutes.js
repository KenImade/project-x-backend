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

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          description: "JWT Authorization header using the Bearer scheme (Example: 'Bearer 12345abcdef')"
 *          type: apiKey
 *          name: Authorization
 *          in: header
 *          bearerFormat: JWT
 *  schemas:
 *      Expenses:
 *          type: object
 *          required:
 *              - id
 *              - description
 *              - amount
 *              - transactionDate
 *              - customerId
 *          properties:
 *              id:
 *                  type: integer
 *                  description: id of the expense
 *              description:
 *                  type: string
 *                  description: description of the sale
 *              amount:
 *                  type: double
 *                  description: expense amount
 *              transactionDate:
 *                  type: string
 *                  description: date of expense
 *              customerId:
 *                  type: integer
 *                  description: id of the customer
 *          example:
 *              description: "Expense made"
 *              amount: 5000
 *              transactionDate: "05-05-2020"
 *              customerId: 1
 *      error401:
 *          type: string
 *          example: '<html><body>Your HTML text</body></html>'
 */

/**
 * @swagger
 * tags:
 *  name: Expenses
 *  description: The expenses managing API
 */

/**
 * @swagger
 * /api/expenses:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Gets all exenses for the user
 *      tags: [Expenses]
 *      responses:
 *          200:
 *              description: A JSON array of expense objects
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Expenses'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          404:
 *              description: Expenses list was not found
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          500:
 *              description: Internal server error
 *              content: 
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.get('/', protect, getAllExpenses)

/**
 * @swagger
 * /api/expenses:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Creates a new expense
 *      tags: [Expenses]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      Expense:
 *                      type: object
 *                      properties:
 *                          description:
 *                              type: string
 *                              description: details of expense
 *                          amount:
 *                              type: double
 *                              description: expense amount
 *                          transactionDate:
 *                              type: string
 *                              description: date of expense
 *                          customerId:
 *                              type: integer
 *                              description: id of customer
 *      responses:
 *          200:
 *              description: The expense was added
 *              content:
 *                  application/json:
 *                      schema:
 *                              Message:
 *                              type: object
 *                              properties:
 *                                  msg:
 *                                      type: string
 *                                      description: expense was added message
 *          400:
 *              description: Invalid request
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          500:
 *             description: Internal server error
 *             content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401' 
 */
router.post('/', protect, createExpense)

/**
 * @swagger
 * /api/expenses/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Gets an expense by id
 *      tags: [Expenses]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The expense id
 *      responses:
 *          200:
 *              description: The expense description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Expense'
 *          404:
 *              description: The expense was not found or does not belong to this customer
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.get('/:id', protect, getExpense)

/**
 * @swagger
 * /api/expenses/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update the expense by the id
 *      tags: [Expenses]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: The expense id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      Expense:
 *                      type: object
 *                      properties:
 *                          description:
 *                                  type: string
 *                                  description: expense details
 *                          amount:
 *                                  type: double
 *                                  description: expense amount
 *                          transactionDate:
 *                                  type: string
 *                                  description: date of expense
 *                          customerId:
 *                                  type: integer
 *                                  description: id of customer
 *      repsonses:
 *          200:
 *              description: The expense was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          Message:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      description: id of the updated expense
 *                                  message:
 *                                      type: string
 *                                      description: update successful message
 *          404:
 *              description: The expense was not found
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          401:
 *              description: Unauthorized user
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          500:
 *              description: Interanl server error
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.put('/:id', protect, updateExpense)

/**
 * @swagger
 * /api/expenses/{id}:
 *  delete:
 *      security:
 *          bearerAuth: []
 *      summary: Delete the expense by the id
 *      tags: [Expenses]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: The expense id
 *      responses:
 *          200:
 *              description: The customer was deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          Message:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      description: id of deleted expense
 *                                  msg:
 *                                      type: string
 *                                      description: Delete confirmation message
 *          404:
 *              description: The expense was not found
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          500:
 *              description: Internal serve error
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.delete('/:id', protect, deleteExpense)


module.exports = router;