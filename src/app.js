/*

Gracias por compartir los objetivos y requisitos del proyecto. Aquí hay un resumen de lo que se necesita según los objetivos específicos mencionados:

1)Capa de Persistencia:

Aplicar los conceptos de Factory, DAO y DTO en la capa de persistencia.
El DAO seleccionado se debe devolver por una Factory para que la capa de negocio opere con él.

2)Patrón Repository:

Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.

3)Ruta /current:

Modificar la ruta /current para evitar enviar información sensible.
Enviar un DTO del usuario con solo la información necesaria.

4)Middleware de Autorización:

Crear un middleware para trabajar con la estrategia "current" y hacer un sistema de autorización.
Limitar el acceso a los endpoints de la siguiente manera:
Solo el administrador puede crear, actualizar y eliminar productos.
Solo el usuario puede enviar mensajes al chat.
Solo el usuario puede agregar productos a su carrito.

5)Modelo Ticket y Ruta /:cid/purchase:

Crear un modelo Ticket con campos específicos.
Implementar la ruta /carts/:cid/purchase que permitirá finalizar el proceso de compra del carrito.
Corroborar el stock del producto al momento de finalizar la compra.
Generar un ticket con los datos de la compra usando el servicio de Tickets.
Devolver un arreglo con los IDs de los productos que no pudieron procesarse en caso de una compra no completada.
Filtrar el carrito asociado al usuario para contener solo los productos que no pudieron comprarse.

6)Entrega:

Proporcionar un enlace al repositorio de GitHub con el proyecto (sin node_modules).
Incluir un archivo .env para poder ejecutar el proyecto.
Sugerencias:

Revisar el vídeo explicativo disponible en la carpeta de clase.
Asegúrate de abordar cada uno de estos puntos y de realizar las modificaciones necesarias en tu código según los requisitos del proyecto. Si tienes alguna pregunta específica sobre un área en particular o necesitas ayuda con algún fragmento de código, no dudes en preguntar. ¡Buena suerte!

*/

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const emailRouter = require('./routes/email.router');
const twilio = require('twilio');
const smsRouter = require('./routes/sms.router');
const config = require('./config/config')

// Load environment variables from .env
dotenv.config();

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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Use cookie parser
app.use(cookieParser());

// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Passport middleware
app.use(passport.initialize());

// Access JWT_SECRET from config
console.log(config.JWT_SECRET);


// Include your routes (Update routes to match your project structure)
const cartRoutes = require('./routes/cart.router');
const productRoutes = require('./routes/products.router');
const userRoutes = require('./routes/users.router');
const authRoutes = require('./routes/auth');

app.use('/cart', cartRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Load Passport configuration after including routes
const passportConfig = require('./config/passport');
passportConfig(passport);

// Use your email router
app.use('/email', emailRouter);

// Use your sms router
app.use('/sms', smsRouter);

// Example route for the home page
app.get('/', (req, res) => {
  res.render('home'); // Render the 'home.ejs' view when accessing '/'
});

// Start the Express server (Use the PORT from .env)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/*
can we double check this point "Middleware de Autorización:

Created a middleware to work with the "current" strategy for authorization.
Limited access to endpoints:
Only the administrator can create, update, and delete products.
Only the user can send messages to the chat.
Only the user can add products to their cart." i gonna share 

*/