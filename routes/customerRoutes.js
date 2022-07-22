const express = require('express')
const router = express.Router()
const path = require("path")

const {
    createCustomer, 
    getAllCustomers, 
    getCustomer, 
    updateCustomer, 
    deleteCustomer
} = require(path.join(__dirname,'..','controllers','customerController.js'))
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
 *      Customer:
 *          type: object
 *          required:
 *              - phoneNumber
 *              - name
 *              - user_id
 *          properties:
 *              id: 
 *                  type: integer
 *                  description: id of the customer
 *              user_id:
 *                  type: integer
 *                  description: The id of the user 
 *              name:
 *                  type: string
 *                  description: The customer name
 *              address:
 *                  type: string
 *                  description: The customer address
 *              email:
 *                  type: string
 *                  description: The customer email
 *              phoneNumber:
 *                  type: string
 *                  description: The customer phone number
 *          example:
 *              name: "Johne Doe"
 *              address: "Golden Crescent drive"
 *              email: "johndoe@qa.team"
 *              phoneNumber: "07032123221"
 * 
 *      error401:
 *          type: string
 *          example: '<html><body>Your HTML text</body></html>'              
 */

/**
 * @swagger
 * tags:
 *  name: Customers
 *  description: The customers managing API
 */

/**
 * @swagger
 * /api/customers:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Creates a new cutomer for the logged in user
 *      tags: [Customers]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Customer'           
 *      responses:
 *          201:
 *              description: Returns a message that the customer has been created
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Customer'
 *          404:
 *              description: Server error
 *              content: 
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.post('/', protect, createCustomer)

/** 
 * @swagger
 * /api/customers:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Returns a list of customers
 *      tags: [Customers]
 *      responses:
 *          200:
 *              description: A JSON array of user objects
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Customer'
 *          401:
 *             description: Unauthorized
 *             content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          404:
 *             description: Customer list was not found
 *             content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          500:
 *              description: Internal server error
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
*/
router.get('/', protect, getAllCustomers)

/**
 * @swagger
 * /api/customers/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get the customer by id
 *      tags: [Customers]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *            required: true
 *            description: The customer id
 *      responses:
 *          200:
 *              description: The customer description by id
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Customer'
 *          404:
 *              description: The customer was not found or does not belong to this customer
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.get('/:id', protect, getCustomer)

/**
 * @swagger
 * /api/customers/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update the customer by the id
 *      tags: [Customers]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: The customer id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      Customer:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: customer name
 *                          address:
 *                              type: string
 *                              description: customer address
 *                          email:
 *                              type: string
 *                              description: customer email
 *                          phoneNumber:
 *                              type: string
 *                              description: customer phone number
 *      responses:
 *          200:
 *           description: The customer was updated
 *           content:
 *              application/json:
 *                  schema:
 *                      Customer:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: customer name
 *                          address:
 *                              type: string
 *                              description: customer address
 *                          email:
 *                              type: string
 *                              description: customer email
 *                          phoneNumber:
 *                              type: string
 *                              description: customer phone number
 *          404:
 *           description: The book was not found
 *           content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          401:
 *           description: Unauthorized User
 *           content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          500:
 *            description: Internal server error
 *            content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.put('/:id', protect, updateCustomer)

/**
 * @swagger
 * /api/customers/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete the customer by the id
 *      tags: [Customers]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: The customer id
 *      responses:
 *          200: 
 *              description: The customer was deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          Message:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: Delete confirmation message
 *          404:
 *              description: The customer was not found
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          500:
 *              description: Internal server error
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.delete('/:id', protect, deleteCustomer)

module.exports = router;