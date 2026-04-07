const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employee.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas Semánticas
// Prefijamos con /api/employees para que el router interno use solo / y /:id
app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});