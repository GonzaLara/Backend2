import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import __dirname from './utils.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const app = express();
const PORT = 4000;

// Importar los routers
import userRouter from './routes/user.router.js';
import sessionRouter from './routes/session.router.js';

// URL de conexión a MongoDB
const mongoURL = 'mongodb://localhost:27017/backend2';

// Middleware para analizar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a la base de datos MongoDB'))
  .catch((error) => console.error('Error en la conexión:', error));

// Configurar cookies
app.use(cookieParser());

// Configurar sesiones con MongoDB
app.use(session({
  store: MongoStore.create({
    mongoUrl: mongoURL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: 'asd3nc3okasod', // Cambiar por una clave secreta más segura
  resave: false,
  saveUninitialized: false,
}));

// Inicializar Passport después de las sesiones
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Configurar motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configurar carpeta estática
app.use(express.static(__dirname + '/public'));

// Registrar rutas
app.use('/', userRouter);
app.use('/api', sessionRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
//


// // Configurar para trabajar con JSON 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Cargar las variables de entorno
// dotenv.config();
// const URIConexion = process.env.DB_URI;

// // Conexion a la base de datos
// mongoose.connect(URIConexion)
//     .then( () => console.log('Conectado a la base de datos MongoDB Atlas.'))
//     .catch((error) => console.error('Error en conexion:', error))
// ;

// // Configurar Handlebars como motor de plantillas
// app.engine('handlebars', engine({
//     layoutsDir: path.join(__dirname, 'src', 'views', 'layouts'),
//     // partialsDir: path.join(__dirname, 'src', 'views', 'partials'),
//     defaultLayout: 'main',
//     runtimeOptions: {
//         allowProtoPropertiesByDefault: true,
//         allowProtoMethodsByDefault: true,
//     },
// }));

// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'src', 'views'));

// // Setear de manera estatica la carpeta public
// app.use(express.static(path.join(__dirname, 'src', 'public')));

// // Configuracion de sesiones
// app.use(session({
//     secret: 'my secret key',
//     saveUninitialized: true,
//     resave: false
// }));

// app.use((req, res, next) => {
//     res.locals.message = req.session.message;
//     delete req.session.message;
//     next();
// });

// // Route prefix
// app.use("", routes);

// app.listen(PORT, () => {
//     console.log(`Servidor iniciado en http://localhost:${PORT}`);
// });

