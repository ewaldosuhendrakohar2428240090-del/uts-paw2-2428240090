require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const pengelolaRoutes = require('./routes/pengelolaRoutes');
const destinasiRoutes = require('./routes/destinasiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware global ----------
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Express 5: req.body bernilai undefined bila request tidak membawa body JSON
app.use((req, res, next) => {
  req.body ??= {};
  next();
});

// ---------- Route dasar ----------
app.get('/', (req, res) => {
  res.json({
    message: 'API Pariwisata Daerah berjalan!',
    endpoints: {
      pengelola: '/pengelola',
      destinasi: '/destinasi',
    },
  });
});

// ---------- Route per modul ----------
app.use('/pengelola', pengelolaRoutes);
app.use('/destinasi', destinasiRoutes);

// ---------- Handler 404 dan error handler (paling bawah) ----------
app.use(notFoundHandler);
app.use(errorHandler);

// ---------- Koneksi ke MongoDB dan jalankan server ----------
const mongoUri = process.env.MONGODB_URI || process.env.DB_URI;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Terhubung ke MongoDB');
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal terhubung ke MongoDB:', err.message);
    process.exit(1);
  });

module.exports = app;
