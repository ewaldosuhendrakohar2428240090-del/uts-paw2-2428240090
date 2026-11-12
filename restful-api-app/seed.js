require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const Pengelola = require('./models/pengelolaModel');
const Destinasi = require('./models/destinasiModel');

async function main() {
  const mongoUri = process.env.MONGODB_URI || process.env.DB_URI || 'mongodb://127.0.0.1:27017/uts_paw2';
  await mongoose.connect(mongoUri);

  await Destinasi.deleteMany({});
  await Pengelola.deleteMany({});

  const pengelolaList = await Pengelola.insertMany([
    { kode: 'PGL01', nama: 'Dinas Pariwisata Palembang' },
    { kode: 'PGL02', nama: 'Balai Konservasi Alam' },
    { kode: 'PGL03', nama: 'Pokdarwis Sriwijaya' },
  ]);

  const destinasiList = [
    {
      kode: 'DST-2428240090-01',
      nama: 'Jembatan Ampera',
      tarif: 0,
      kategori: 'sejarah',
      alamat: { jalan: 'Jl. Jenderal Sudirman', kota: 'Palembang' },
      pengelolaId: pengelolaList[0]._id,
    },
    {
      kode: 'DST-2428240090-02',
      nama: 'Pulau Kemaro',
      tarif: 15000,
      kategori: 'budaya',
      alamat: { jalan: 'Sungai Musi', kota: 'Palembang' },
      pengelolaId: pengelolaList[0]._id,
    },
    {
      kode: 'DST-2428240090-03',
      nama: 'Taman Punti Kayu',
      tarif: 25000,
      kategori: 'alam',
      alamat: { jalan: 'Jl. Kol. H. Burlian', kota: 'Palembang' },
      pengelolaId: pengelolaList[1]._id,
    },
    {
      kode: 'DST-2428240090-04',
      nama: 'Danau Ranau',
      tarif: 10000,
      kategori: 'alam',
      alamat: { jalan: 'Jl. Raya Ranau', kota: 'OKU Selatan' },
      pengelolaId: pengelolaList[1]._id,
    },
    {
      kode: 'DST-2428240090-05',
      nama: 'Benteng Kuto Besak',
      tarif: 5000,
      kategori: 'sejarah',
      alamat: { jalan: 'Jl. Sultan Mahmud Badaruddin II', kota: 'Palembang' },
      pengelolaId: pengelolaList[2]._id,
    },
  ];

  await Destinasi.insertMany(destinasiList);

  console.log(`Seed berhasil: ${pengelolaList.length} pengelola, ${destinasiList.length} destinasi ditambahkan`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Seed gagal:', err.message);
  process.exit(1);
});
