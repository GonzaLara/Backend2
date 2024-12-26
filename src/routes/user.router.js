import { Router}  from 'express';
import  { isLoggedIn, isLoggedOut} from '../middlewares/auth.js';

const router = Router();

router.get('/login', isLoggedOut, (req, res) => {
    res.render('login');
})

router.get('/register', isLoggedOut, (req, res) => {
    res.render('register');
})

router.get('/restore-password', isLoggedOut, (req, res) => {
    res.render('restore');
})

export default router;