const mongoose = require('mongoose');

const alamatSchema = new mongoose.Schema({
  jalan: String,
  kota: String,
}, { _id: false });

const destinasiSchema = new mongoose.Schema({
  nama: { type: String, required: [true, 'nama wajib diisi'], trim: true },
  alamat: alamatSchema,
  pengelolaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pengelola' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Destinasi', destinasiSchema);