// userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./db'); // Assuming db.js is in the same directory

const apiRouter = express.Router();

apiRouter.post('/users', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [results] = await pool.query(
      'INSERT INTO users (Username, PasswordHash, Email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    );
    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ message: 'Error inserting user', error });
  }
});

apiRouter.get('/users', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM users');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

module.exports = apiRouter;

window.addEventListener("popstate", () => mainRouter(window.location.pathname));
mainRouter(window.location.pathname); // Call the main router for every navigation link

s