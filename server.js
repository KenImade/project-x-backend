const express = require("express");
const path = require("path")
const dotenv = require("dotenv").config();
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const {errorHandler} = require(path.join(__dirname) +'/middleware/errorMiddleware.js')
const swaggerOptions = require(path.join(__dirname) + '/swagger.js')
const cors = require("cors")

const port = process.env.PORT || 5000;
const app = express();

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'/public')))
app.use(errorHandler);
app.use(
    cors({
        origin: "*",
        methods: ["GET","HEAD","PUT","POST","DELETE"],
    })
)

// Routes
app.use('/api/users', require(path.join(__dirname) + '/routes/userRoutes'))
app.use('/api/customers', require(path.join(__dirname) + '/routes/customerRoutes'))
app.use('/api/sales', require(path.join(__dirname) + '/routes/salesRoutes'))
app.use('/api/expenses', require(path.join(__dirname) + '/routes/expensesRoutes'))
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/', (req, res) => {
    res.render('index', {title: "Bojuto Backend"})
})


app.listen(port, () => console.log(`Server started on port ${port}`))