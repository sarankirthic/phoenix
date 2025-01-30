const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'No token provided.' });
    }

    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized.' });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = { generateToken, verifyToken, bcrypt };
