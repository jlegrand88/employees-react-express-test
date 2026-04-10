const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employee.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Definimos los orígenes permitidos
const allowedOrigins = [
    'https://jlegrand88.github.io', // Producción
    'http://localhost:3000',        // Desarrollo Local (Next.js)
    'http://127.0.0.1:3000'         // Por si acaso
];

// Middleware de CORS dinámico
app.use(cors({
    origin: function (origin, callback) {
        // Permitir peticiones sin origen (como Postman o curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middlewares

app.use(express.json());

// Rutas Semánticas
// Prefijamos con /api/employees para que el router interno use solo / y /:id
app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});