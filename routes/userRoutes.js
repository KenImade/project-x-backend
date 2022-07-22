const express = require('express')
const router = express.Router()
const path = require("path")

const {
    registerUser, 
    loginUser, 
    getCurrentUser
} = require(path.join(__dirname,'..','controllers','userController.js'))
const {protect} = require(path.join(__dirname,'..','middleware','authMiddleware.js'))

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          description: "JWT JWT Authorization header using the Bearer scheme (Example: 'Bearer 12345abcdef')"
 *          type: apiKey
 *          name: Authorization
 *          in: header
 *          bearerFormat: JWT
 *  schemas:
 *      User:
 *         type: object
 *         required:
 *            - firstname
 *            - lastname
 *            - email
 *            - phoneNumber
 *            - password
 *         properties:
 *            id:
 *                type: integer
 *                description: id of the user
 *            firstname:
 *                type: string
 *                description: Firstname of user
 *            lastname:
 *                type: string
 *                description: Last name of user
 *            phoneNumber:
 *                type: string
 *                description: Phone number of user
 *            email:
 *                type: string
 *                description: Email of user
 *            password:
 *                type: string
 *                description: Password of user
 *         example:
 *             firstname: "John"
 *             lastname: "Doe"
 *             email: "johndoe@gmail.com"
 *             phoneNumber: "08032158212"
 *             password: "Ciroma1991"
 *
 *      error401:
 *          type: string
 *          example: '<html><body>Your HTML text</body></html>'
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Creates a new user, either email or phoneNumber need to be present
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      User:
 *                      type: object
 *                      properties:
 *                          firstname:
 *                              type: string
 *                              description: User first name
 *                          lastname:
 *                              type: string
 *                              description: User last name
 *                          email:
 *                              type: string
 *                              description: User email
 *                          phoneNumber:
 *                              type: string
 *                              description: User phone number
 *                          password:
 *                              type: string
 *                              description: User password
 *      responses:
 *          200:
 *              description: Returns a message that the user has been created and a token
 *              content:
 *                  application/json:
 *                      schema:
 *                          Message:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: User created message
 *                              token:
 *                                  type: string
 *                                  description: User token
 *          400:
 *              description: The parameters are invalid or user already exists
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          500:
 *              description: Internal server error
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.post('/', registerUser)

/**
 * @swagger
 * /api/users/login:
 *  post:
 *      summary: User login
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      schema:
 *                      User:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: user email
 *                          phoneNumber:
 *                              type: string
 *                              description: user phone number
 *                          password:
 *                              type: string
 *                              description: user password
 *      responses:
 *          200:
 *              description: Succesful login
 *              content:
 *                  application/json:
 *                      schema:
 *                          User:
 *                          type: object
 *                          properties:
 *                              id: 
 *                                  type: integer
 *                                  description: user id
 *                              name:
 *                                  type: string
 *                                  description: user first name
 *                              email:
 *                                  type: string
 *                                  description: user email
 *                              phoneNumber:
 *                                  type: string
 *                                  description: user phone number
 *                              token:
 *                                  type: string
 *                                  description: user token
 *          400:
 *              description: Invalid credentials
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 *          404:
 *              description: User does not exist
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401' 
 *          500:
 *              description: Internal server error
 *              content:
 *                  text/html:
 *                      $ref: '#/components/schemas/error401'
 */
router.post('/login', loginUser)

/**
 * @swagger
 * /api/users/me:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get the info of logged in user
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: User details
 *              content:
 *                  application/json:
 *                      schema:
 *                          User:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: User id
 *                              firstname:
 *                                  type: string
 *                                  description: User first name
 *                              lastname:
 *                                  type: string
 *                                  description: User last name
 *                              email:
 *                                  type: string
 *                                  description: User email
 *                              phoneNumber:
 *                                  type: string
 *                                  description: User phone number
 *                              
 *          404:
 *              description: The user is not logged in
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
router.get('/me', protect, getCurrentUser)

module.exports = router;