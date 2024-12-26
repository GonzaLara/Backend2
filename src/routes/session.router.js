import express from 'express';
import passport from 'passport';
import User from '../models/user.models.js';
import { generateToken } from '../config/jwt.config.js';

const router = express.Router();

// Registro
router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    res.redirect('/login');
});

router.get('/failregister', (req, res) => {
    res.status(400).send({ error: 'Registro fallido' });
});

// Iniciar sesión
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).send({ status: 'error', error: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = generateToken(user);

        // Enviar el token al cliente en una cookie
        res.cookie('token', token, { httpOnly: true }).redirect('/'); // Redirige a la página index
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
});


router.get('/faillogin', (req, res) => {
    res.status(400).send({ error: 'Error al iniciar sesión' });
});

// Cerrar sesión
router.post('/logout', (req, res) => {
    req.session.destroy( (error) => {
        if(error){
            console.error('Error al cerrar sesión');
            res.status(500).send('Error al cerrar sesión');
        } else{
            res.redirect('/login');
        }
    })
})


export default router;
