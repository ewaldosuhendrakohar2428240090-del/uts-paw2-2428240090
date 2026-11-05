	const express = require('express');
	const app = express();
	const PORT = 3000;

    const mongoose = require('mongoose');
	// Middleware agar req.body (JSON) dapat dibaca
	app.use(express.json());
	

	// Data sementara (disimpan di memori, hilang saat server restart)
	let pariwisata = [
	  { id: 1, nama: 'Andi', Harga_Tiket: '30000' },
	  { id: 2, nama: 'Budi', Harga_Tiket: '30000' },
	];
	let nextId = 3;
	
	// GET / -> memastikan server berjalan
	app.get('/', (req, res) => {
	  res.send('Server Express.js berjalan!');
	});
	
	// GET /mahasiswa -> seluruh data, bisa difilter: /mahasiswa?jurusan=Informatika
	app.get('/Mahasiswa', (req, res) => {
	  const { Harga_Tiket } = req.query;
	
	  if (Harga_Tiket) {
	    const hasil = pariwisata.filter((m) => m.Harga_Tiket === Harga_Tiket);
	    return res.json(hasil);
	  }
	
	  res.json(pariwisata);
	});
	
	// GET /mahasiswa/:id -> satu data berdasarkan id
	app.get('/Pariwisata/:id', (req, res) => {
	  const id = parseInt(req.params.id);
	  const data = Pariwisata.find((m) => m.id === id);
	
	  if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });
	  res.json(data);
	});
	
	// POST /mahasiswa -> tambah data baru
	app.post('/Pariwisata', (req, res) => {
	  const { nama, Harga_Tiket } = req.body;
	
	  if (!nama || !Harga_Tiket) {
	    return res.status(400).json({ message: 'nama dan jurusan wajib diisi' });
	  }
	
	  const baru = { id: nextId++, nama, Harga_Tiket };
	  Pariwisata.push(baru);
	  res.status(201).json(baru);
	});
	
	// PUT /mahasiswa/:id -> ubah data
	app.put('/Pariwisata/:id', (req, res) => {
	  const id = parseInt(req.params.id);
	  const index = Pariwisata.findIndex((m) => m.id === id);
	
	  if (index === -1) {
	    return res.status(404).json({ message: 'Data tidak ditemukan' });
	  }
	
	  Pariwisata[index] = { ...Pariwisata[index], ...req.body, id };
	  res.json(Pariwisata[index]);
	});
	
	// DELETE /mahasiswa/:id -> hapus data
	app.delete('/Pariwisata/:id', (req, res) => {
	  const id = parseInt(req.params.id);
	  const index = Pariwisata.findIndex((m) => m.id === id);
	
	  if (index === -1) {
	    return res.status(404).json({ message: 'Data tidak ditemukan' });
	  }
	
	  Pariwisata.splice(index, 1);
	  res.status(204).send();
	});

    mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');
    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Gagal terhubung:', err.message);
    process.exit(1);
  });