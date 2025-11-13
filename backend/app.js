import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import initializeDatabase from './src/dataBase/init.js';
import offerRoutes from './src/routes/offerRoutes.js';
import proposalRoutes from './src/routes/proposalRoutes.js';
import contractRoutes from './src/routes/contractRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import freelanceRoutes from './src/routes/freelanceRoutes.js';
import clientRoutes from './src/routes/clientRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import authMiddleware from './src/middlewares/authMiddleware.js';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4500;
const CLIENT_PORT = process.env.CLIENT_PORT || 5173;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN, options: { timeout: 5000 } });
const preferenceClient = new Preference(client);
const paymentClient = new Payment(client);


app.get('/', (req, res) => {
    res.json({ message: 'DevSolutions API' });
});

// Ruta para crear una preferencia de pago
app.post('/create-preference', async (req, res) => {
    try {
        const { title, price, quantity, contractId } = req.body;

        // Validar datos
        if (!title || !price || !quantity || !contractId) {
            return res.status(400).json({
                error: 'Faltan datos requeridos'
            });
        }

        // Crear preferencia de pago - VERSIÓN MINIMALISTA que funciona
        const body = {
            notification_url: `https://unantagonised-shaniqua-selenious.ngrok-free.dev/webhook`,
            external_reference: String(contractId),
            auto_return: "approved",
            items: [
                {
                    title: title,
                    quantity: parseInt(quantity),
                    unit_price: parseFloat(price),
                    currency_id: 'COP'
                }
            ],
            back_urls: {
                success: `https://unantagonised-shaniqua-selenious.ngrok-free.dev/PaymentSuccess?contractId=${contractId}`,
                failure: `https://unantagonised-shaniqua-selenious.ngrok-free.dev/PaymentFailure?contractId=${contractId}`,
                pending: `https://unantagonised-shaniqua-selenious.ngrok-free.dev/PaymentPending?contractId=${contractId}`
            }

        };

        console.log('Creando preferencia minimalista...');

        const response = await preferenceClient.create({ body });

        console.log('Preferencia creada exitosamente!');
        console.log('ID:', response.id);
        console.log('Init Point:', response.init_point);

        res.json({
            id: response.id,
            init_point: response.init_point
        });

    } catch (error) {
        console.error('Error al crear preferencia:', {
            message: error.message,
            error: error.error,
            status: error.status
        });

        res.status(500).json({
            error: 'Error al crear la preferencia de pago',
            details: error.message
        });
    }
});

// Webhook para recibir notificaciones de MercadoPago
app.post("/webhook", async (req, res) => {
    try {
        console.log("🔔 WEBHOOK RECIBIDO");
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);

        // MercadoPago envía: req.body.type, req.body.action, req.body.data.id
        const paymentId = req.body?.data?.id;

        // MP necesita recibir respuesta RÁPIDA o no reenviará el evento
        res.sendStatus(200);

        if (!paymentId) {
            console.log("❌ No llegó el ID del pago");
            return;
        }

        console.log(`🔍 Consultando pago ${paymentId}...`);

        const paymentInfo = await paymentClient.get({ id: paymentId });

        console.log("📄 Información del pago:");
        console.log("ID:", paymentInfo.id);
        console.log("Estado:", paymentInfo.status);
        console.log("Monto:", paymentInfo.transaction_amount);
        console.log("Email:", paymentInfo.payer?.email);
        console.log("Referencia:", paymentInfo.external_reference);

        // Lógica según estado del pago
        switch (paymentInfo.status) {
            case "approved":
                console.log("🟢 Pago aprobado → Actualizar contrato / DB");
                break;
            case "pending":
                console.log("🟡 Pago pendiente → Esperar confirmación");
                break;
            case "rejected":
                console.log("🔴 Pago rechazado");
                break;
        }

    } catch (err) {
        console.error("Error en webhook:", err);
    }
});
// --- RUTAS DE REDIRECCIÓN DE MERCADOPAGO ---

app.get('/PaymentSuccess', (req, res) => {
    const query = new URLSearchParams(req.query).toString();
    res.setHeader("ngrok-skip-browser-warning", "true");
    res.redirect(`http://localhost:5173/PaymentSuccess?${query}`);
});

app.get('/PaymentFailure', (req, res) => {
    const query = new URLSearchParams(req.query).toString();
    res.setHeader("ngrok-skip-browser-warning", "true");
    res.redirect(`http://localhost:5173/PaymentFailure?${query}`);
});

app.get('/PaymentPending', (req, res) => {
    const query = new URLSearchParams(req.query).toString();
    res.setHeader("ngrok-skip-browser-warning", "true");
    res.redirect(`http://localhost:5173/PaymentPending?${query}`);
});

// Public auth endpoints
app.use('/api/v1/auth', authRoutes);

// Protect all other /api/v1 routes
app.use('/api/v1', authMiddleware);

app.use('/api/v1/offer', offerRoutes);
app.use('/api/v1/proposal', proposalRoutes);
app.use('/api/v1/contract', contractRoutes);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/freelancers', freelanceRoutes);
app.use('/api/v1/clients', clientRoutes);

app.use((err, req, res, next) => {
    console.error('Error details:', err);
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err : undefined
    });
});

const startServer = async () => {
    try {
        // Initialize database first
        await initializeDatabase();

        // Start server only after database is ready
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
            console.log(`Access at: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit if database initialization fails
    }
};



// Start server
startServer();

export default app;