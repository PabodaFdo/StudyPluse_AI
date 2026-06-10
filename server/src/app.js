const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health.routes');

const app = express();

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------- Routes ---------------
app.use('/api', healthRoutes);

// --------------- 404 Handler ---------------
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// --------------- Error Handler ---------------
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

module.exports = app;
