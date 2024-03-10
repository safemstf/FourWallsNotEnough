require('dotenv').config();
const express = require('express');
const userRoutes = require('../../database/userRoutes'); // Adjust path as necessary
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// initialize middleware: handles api between routers
app.use(express.json());
app.use('/api', userRoutes);
app.use('/sourceCode', express.static(path.join(__dirname, 'sourceCode')));

// get request for any file and respnds to the index.html 
// in the fourwallsnotenough directory


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'FourWallsNotEnough', 'index.html'));
});


// App listener is like the meterpreter in the metaspoloit framework
// Flag: Security features
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      // stop MIME type sniffing attacks
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});
