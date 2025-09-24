import express from 'express';
import dotenv from 'dotenv';
import initializeDatabase from './src/dataBase/init.js';
import offerRoutes from './src/routes/offerRoutes.js';
import proposalRoutes from './src/routes/proposalRoutes.js';
import contractRoutes from './src/routes/contractRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import freelanceRoutes from './src/routes/freelanceRoutes.js';
import clientRoutes from './src/routes/clientRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'DevSolutions API' });
});

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