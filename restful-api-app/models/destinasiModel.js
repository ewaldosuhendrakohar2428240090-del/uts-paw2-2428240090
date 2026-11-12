const mongoose = require('mongoose');

const alamatSchema = new mongoose.Schema({
  jalan: { type: String, trim: true },
  kota: { type: String, trim: true },
}, { _id: false });

const destinasiSchema = new mongoose.Schema({
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
  tarif: {
    type: Number,
    required: [true, 'tarif wajib diisi'],
    min: [0, 'tarif tidak boleh kurang dari 0'],
  },
  kategori: {
    type: String,
    required: [true, 'kategori wajib diisi'],
    trim: true,
  },
  alamat: {
    type: alamatSchema,
    default: () => ({}),
  },
  pengelolaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pengelola',
    required: [true, 'pengelolaId wajib diisi'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Destinasi', destinasiSchema);
