const express = require("express");
const path = require("path")
const dotenv = require("dotenv").config();
const {errorHandler} = require(path.join(__dirname) +'/middleware/errorMiddleware.js')
const port = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler);

// Routes
app.use('/api/users', require(path.join(__dirname) + '/routes/userRoutes'))
app.use('/api/customers', require(path.join(__dirname) + '/routes/customerRoutes'))
app.use('/api/sales', require(path.join(__dirname) + '/routes/salesRoutes'))
app.use('/api/expenses', require(path.join(__dirname) + '/routes/expensesRoutes'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname) + '/views/index.html')
})


app.listen(port, () => console.log(`Server started on port ${port}`))