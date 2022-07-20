const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler);

// Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use('/api/customers', require('./routes/customerRoutes'))
app.use('/api/sales', require('./routes/salesRoutes'))
app.use('/api/expenses', require('./routes/expensesRoutes'))

app.get('/', (req, res) => res.send('Bojuto backend is up'));


app.listen(port, () => console.log(`Server started on port ${port}`))