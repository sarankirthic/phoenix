const express = require("express");
const { Gadget } = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

// Helper function to generate a random codename
const generateCodename = () => {
    const adjectives = ["Nightingale", "Kraken", "Phoenix", "Valkyrie", "Shadow"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    return `The ${randomAdjective}`;
};

// Helper function to generate a random success probability
const generateSuccessProbability = () => Math.floor(Math.random() * 100) + 1;

// GET /gadgets - Retrieve all gadgets
app.get("/gadgets", async (req, res) => {
    const gadgets = await Gadget.findAll();
    const gadgetsWithProbability = gadgets.map((gadget) => ({
        ...gadget.toJSON(),
        successProbability: `${generateSuccessProbability()}%`,
    }));
    res.json(gadgetsWithProbability);
});

// POST /gadgets - Add a new gadget
app.post("/gadgets", async (req, res) => {
    const { codename } = req.body;
    // const codename = generateCodename();
    const gadget = await Gadget.create({ codename });
    res.status(201).json(gadget);
});

// PATCH /gadgets/:id - Update a gadget
app.patch("/gadgets/:id", async (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });
    await gadget.update({ name, status });
    res.json(gadget);
});

// DELETE /gadgets/:id - Decommission a gadget
app.delete("/gadgets/:id", async (req, res) => {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });
    await gadget.update({ status: "Decommissioned", decommissionedAt: new Date() });
    res.json(gadget);
});

// POST /gadgets/:id/self-destruct - Trigger self-destruct sequence
app.post("/gadgets/:id/self-destruct", async (req, res) => {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    await gadget.update({ status: "Destroyed" });
    res.json({ message: `Self-destruct sequence initiated. Confirmation code: ${confirmationCode}` });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});