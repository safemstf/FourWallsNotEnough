require('dotenv').config();
import express, { json } from '/express';
import userRoutes from './sourceCode/database/userRoutes.js';
import { join } from 'path';

const app = express();
const { static: ExpressStatic } = express;

// Security headers middleware
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

// Initialize middleware: handles API between routers
app.use(json());
app.use('/api', userRoutes);
app.use('/sourceCode', ExpressStatic(join(__dirname, 'sourceCode')));

// Catch-all route to serve index.html for SPA routing support
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'FourWallsNotEnough', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
