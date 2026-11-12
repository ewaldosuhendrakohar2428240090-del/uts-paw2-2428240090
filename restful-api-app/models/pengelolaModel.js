const mongoose = require('mongoose');

const pengelolaSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'kode wajib diisi'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  nama: {
    type: String,
    required: [true, 'nama wajib diisi'],
    trim: true,
  },
});

module.exports = mongoose.model('Pengelola', pengelolaSchema);
