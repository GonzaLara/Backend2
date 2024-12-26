import express from 'express';
import { jwtAuth } from '../middlewares/jwtAuth.js';

const router = express.Router();

router.get('/', jwtAuth, (req, res) => {
    res.render('index', {
        user: req.user
    });
});

export default router;
