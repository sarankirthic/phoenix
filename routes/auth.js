const express = require('express');
const router = express.Router();
const { generateToken, bcrypt } = require('../utils/auth');

// Fake user database (for demonstration purposes)
const users = [
    { id: 1, username: 'admin', password: bcrypt.hashSync('password123', 10) },
];

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password.' });

    const token = generateToken(user.id);
    res.json({ token });
});

module.exports = router;
