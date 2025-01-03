import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import __dirname from './utils.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import dotenv from 'dotenv';

const app = express();
const PORT = 4000;

// Importar los routers
import userRouter from './routes/user.router.js';
import sessionRouter from './routes/session.router.js';
import indexRouter from './routes/index.router.js';

// Configurar para trabajar con JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar sesiones con MongoDB
dotenv.config();
const mongoURL = process.env.DB_URI;

// Conexion a MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a la base de datos MongoDB Atlas'))
  .catch((error) => console.error('Error en la conexion:', error));


// Configurar cookies
app.use(cookieParser());

app.use(session({
  store: MongoStore.create({
    mongoUrl: mongoURL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Inicializar Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Configurar motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configurar carpeta estatica
app.use(express.static(__dirname + '/public'));

// Registrar rutas
app.use('/', userRouter);
app.use('/api', sessionRouter);
app.use('/', indexRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});