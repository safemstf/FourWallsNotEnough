import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import userRoutes from './userRoutes.js';
import path from 'path';

const port = process.env.PORT || 3000;

// Security headers middleware
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

// Initialize middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/sourceCode', express.static(path.join(path.resolve(), 'sourceCode')));

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'FourWallsNotEnough', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
