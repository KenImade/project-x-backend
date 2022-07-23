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
 *      Sales:
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
 *                  description: sale amount
 *              transactionDate:
 *                  type: string
 *                  description: sale of expense
 *              customerId:
 *                  type: integer
 *                  description: id of the customer
 *          example:
 *              description: "Sale made"
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
 *  name: Sales
 *  description: The sales managing API
 */

/**
 * @swagger
 * /api/sales:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Gets all sales for the user
 *      tags: [Sales]
 *      responses:
 *          200:
 *              description: A JSON array of sale objects
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Sales'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          404:
 *              description: Sales list was not found
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          500:
 *              description: Internal server error
 *              content: 
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.get('/', protect, getAllSales)

/**
 * @swagger
 * /api/sales:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Creates a new sale
 *      tags: [Sales]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      Sale:
 *                      type: object
 *                      properties:
 *                          description:
 *                              type: string
 *                              description: details of sale
 *                          amount:
 *                              type: double
 *                              description: sale amount
 *                          transactionDate:
 *                              type: string
 *                              description: date of sale
 *                          customerId:
 *                              type: integer
 *                              description: id of customer
 *      responses:
 *          200:
 *              description: The sale was added
 *              content:
 *                  application/json:
 *                      schema:
 *                              Message:
 *                              type: object
 *                              properties:
 *                                  msg:
 *                                      type: string
 *                                      description: sale was added message
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
router.post('/', protect, createSale)

/**
 * @swagger
 * /api/sales/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Gets a sale by id
 *      tags: [Sales]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The sale id
 *      responses:
 *          200:
 *              description: The sale description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Sale'
 *          404:
 *              description: The sale was not found or does not belong to this customer
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.get('/:id', protect, getSale)

/**
 * @swagger
 * /api/sales/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update the sale by the id
 *      tags: [Sales]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: The sale id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      Sale:
 *                      type: object
 *                      properties:
 *                          description:
 *                                  type: string
 *                                  description: sale details
 *                          amount:
 *                                  type: double
 *                                  description: sale amount
 *                          transactionDate:
 *                                  type: string
 *                                  description: date of sale
 *                          customerId:
 *                                  type: integer
 *                                  description: id of customer
 *      repsonses:
 *          200:
 *              description: The salee was updated
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
 *              description: The sale was not found
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
router.put('/:id', protect, updateSale)

/**
 * @swagger
 * /api/sales/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete the sale by the id
 *      tags: [Sales]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: The sale id
 *      responses:
 *          200:
 *              description: The sale was deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          Message:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      description: id of deleted sale
 *                                  msg:
 *                                      type: string
 *                                      description: Delete confirmation message
 *          404:
 *              description: The sale was not found
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
router.delete('/:id', protect, deleteSale)

module.exports = router;