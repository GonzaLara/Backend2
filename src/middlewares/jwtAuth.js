import { verifyToken } from '../config/jwt.config.js';

export const jwtAuth = (req, res, next) => {
    const token = req.cookies.token; // El token debe estar en las cookies (puedes enviarlo en encabezados también)
    if (!token) {
        return res.status(401).send({ error: 'No se proporcionó token' });
    }

    const userData = verifyToken(token);
    if (!userData) {
        return res.status(401).send({ error: 'Token inválido o expirado' });
    }

    req.user = userData; // Agrega los datos del usuario al objeto `req` para su uso en las rutas
    next();
};
