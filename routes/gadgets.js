const express = require('express');
const { Gadget } = require('../models');
const { verifyToken } = require('../utils/auth');

const router = express.Router();

// GET gadgets with optional status filter
router.get('/', verifyToken, async (req, res) => {
    try {
        const status = req.query.status;
        const whereClause = status ? { status } : {};

        const gadgets = await Gadget.findAll({ where: whereClause });

        // Handle empty results gracefully
        if (!gadgets.length) {
            return res.status(404).json({ message: 'No gadgets found.' });
        }

        const response = gadgets.map((gadget) => ({
            ...gadget.toJSON(),
            missionSuccessProbability: `${Math.floor(Math.random() * 100) + 1}%`,
        }));

        res.json(response);
    } catch (error) {
        console.error('Error fetching gadgets:', error);
        res.status(500).json({ error: 'An error occurred while fetching gadgets.' });
    }
});

module.exports = router;
