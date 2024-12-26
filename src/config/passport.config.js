import passport from 'passport';
import local from 'passport-local';
import userService from '../models/user.models.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, email, password, done) => {
            const { first_name, last_name, age } = req.body;

            try {
                let user = await userService.findOne({ email: email });
                if (user) {
                    console.log('Usuario ya existe.');
                    return done(null, false);
                }

                let newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };

                const userCreated = await userService.create(newUser);
                return done(null, userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userService.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    passport.use('login', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, email, password, done) => {
            try {
                const user = await userService.findOne({ email: email });
                if (!user) {
                    console.log('Usuario no existe.');
                    return done(null, false, { message: 'Usuario no encontrado' });
                }

                if (!isValidPassword(user, password)) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));
};

export default initializePassport;