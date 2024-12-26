import jwt from 'jsonwebtoken';

// Clave secreta para firmar los tokens
const SECRET_KEY = 'mi_clave_secreta_segura'; // Cambia esto por algo más seguro y almacenado en variables de entorno

// Función para generar un token JWT
export const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role || 'user'
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token válido por 1 hora
};

// Función para verificar el token JWT
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};
