

/*
Tasks to be Completed:

Modify the persistence layer to incorporate the concepts of Factory (optional), DAO (Data Access Object), and DTO (Data Transfer Object).

The selected DAO (determined by a command-line parameter) will be returned by a Factory for use by the business layer.
Implement the Repository pattern to work with the DAO in the business logic.
Modify the route /current to avoid sending sensitive information. Instead, send a DTO (Data Transfer Object) with only the necessary user information.

Create a middleware that works in conjunction with the "current" strategy to establish an authorization system and restrict access to specific endpoints:

Only administrators can create, update, and delete products.
Only users can send messages in the chat.
Only users can add products to their cart.
Create a "Ticket" model that will encompass all the formalizations of a purchase. This model should have the following fields:

Id (auto-generated by MongoDB)
Code: a unique auto-generated string
Purchase date and time: to record the exact date and time of purchase
Amount: the total purchase amount
Purchaser: a string containing the email of the user associated with the cart.
Implement a new route in the cart router: /carts/:cid/purchase. This route will allow users to finalize the purchase process for their cart. The purchase process should:

Verify the product's stock at the time of purchase.
Deduct the purchased quantity from the product's stock if available.
Generate a ticket with the purchase details using the Tickets service.
In case of products with insufficient stock, provide a list of product IDs that couldn't be processed.
Remove the successfully purchased products from the user's cart, leaving the unavailable products.
Let's start by addressing each of these tasks one by one. If you have any specific questions or if you'd like guidance on a particular task, please let me know, and I'll be happy to assist you further.
**************************************************************
1. Modify the Persistence Layer:

Create DAO (Data Access Object) files for each model (e.g., cartDAO.js, productDAO.js, userDAO.js) in the dao folder. These DAOs will interact with your database.
2. Implement the Repository Pattern:

Create repository modules for each model to handle database operations in the business logic. For example, you can create cartRepository.js, productRepository.js, and userRepository.js.
3. Modify the /current Route:

Update the /current route to ensure it doesn't send sensitive information. Instead, send a DTO (Data Transfer Object) with only the necessary user information.
4. Create an Authorization Middleware:

Implement an authorization middleware, such as authorizationMiddleware.js, to control access to specific endpoints. You'll need to define and enforce access rules for administrators and regular users.
5. Create a "Ticket" Model and Route:

Create a ticket.model.js in the models folder with the specified fields.
Implement a new route, /carts/:cid/purchase, in the cart router (cartRoutes.js) to handle finalizing purchases, generating tickets, and handling product stock.
6. Remove Successfully Purchased Products from the User's Cart:

Implement the logic to remove products from the user's cart that have been successfully purchased.
7. Error Handling:

Consider adding robust error handling throughout your application, especially when dealing with database operations, authorization, and purchases. Ensure that your routes and services handle errors gracefully.
8. Documentation:

As you progress with the implementation, maintain good documentation for your code, including comments and README files. Clear and organized code is essential for collaboration and future maintenance.
9. Testing:

Develop unit tests and integration tests to ensure that your application functions as expected. Test different scenarios, including successful and failed cases.
10. Refactoring and Code Organization:

As your application grows, periodically review and refactor your code to keep it organized and maintainable. Consider breaking down large functions into smaller, reusable pieces.
11. Security:

Pay close attention to security, especially when handling user data and transactions. Prevent common security vulnerabilities such as SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).
You can gradually work on these tasks one by one, starting with creating the DAOs and repository modules, then updating routes and implementing authorization and the "Ticket" model. Focus on one task at a time to ensure that each component is properly integrated and tested before moving on to the next.

Remember to regularly test your application and document your progress. If you encounter specific challenges or have questions related to any of these tasks, feel free to ask for assistance or guidance on each specific task as you work through them.

*/
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authenticationMiddleware = require('./middlewares/authentication');
const passport = require('passport'); // Import Passport
const passportConfig = require('./config/passport');


passportConfig(passport);
// Load environment variables from .env
dotenv.config();

console.log(`Server is running on port ${process.env.PORT}`);
console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
console.log(`JWT Secret: ${process.env.JWT_SECRET}`);

// Use the authentication middleware globally for all routes
app.use(authenticationMiddleware);


// Initialize the Express app
const app = express();

// Set up the database connection (Use the MONGODB_URI from .env)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure and use Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use an environment variable for the secret
    resave: false,
    saveUninitialized: true,
  })
);

// Use cookie parser
app.use(cookieParser());

// Set up EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Use Passport middleware
app.use(passport.initialize());
// app.use(passport.session());

// Include your routes (Update routes to match your project structure)
const cartRoutes = require('./routes/cart.router');
const productRoutes = require('./routes/products.router');
const userRoutes = require('./routes/users.router');
const authRoutes = require('./routes/auth');

app.use('/cart', cartRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);


// Example route for the home page
app.get('/', (req, res) => {
  res.render('home'); // Render the 'home.ejs' view when accessing '/'
});

// Start the Express server (Use the PORT from .env)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
