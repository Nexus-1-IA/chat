const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { getUserByEmail, addPremiumUser } = require('./utils/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ Ruta para consultar si un usuario es premium
app.get('/api/es-premium', (req, res) => {
    const email = req.query.email;
    const user = getUserByEmail(email);
    if (user) {
        res.json({ premium: true, plan: user.plan, vence_el: user.vence_el });
    } else {
        res.json({ premium: false });
    }
});

// ✅ Ruta manual para marcar a un usuario como premium (simulando verificación de pago)
app.post('/api/agregar-premium', (req, res) => {
    const { email, plan } = req.body;
    const vence = new Date();
    vence.setMonth(vence.getMonth() + (plan === 'anual' ? 12 : 1));
    addPremiumUser({
        email,
        plan,
        vence_el: vence.toISOString().split('T')[0]
    });
    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Servidor Node.js corriendo en http://localhost:${PORT}`);
});
