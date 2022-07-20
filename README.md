Backend for BookKeeping App

USER ENDPOINTS
@desc    Register new user
@route   POST /api/users
@access  Public
@params  firstname, lastname, email, password

@desc    Login user
@route   POST /api/users/login
@access  Public
@params  email, password

@desc    Get logged in user
@route   GET /api/users/me
@access  Private

SALES ENDPOINTS
@desc    Get sales   
@route   GET /api/sales
@access  Private

@desc    Create a sale
@route   POST /api/sales
@access  Private
@params  description, amount, customerId

@desc    Get a sale
@route   GET /api/sales/:id
@access  Private

@desc    Delete a sale
@route   DELETE /api/sales/:id
@access  Private
