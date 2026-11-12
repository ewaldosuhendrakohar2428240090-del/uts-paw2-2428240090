const Destinasi = require('../models/destinasiModel');
const { errorHttp } = require('../middlewares/errorHandler');

exports.create = async (req, res, next) => {
  try {
    // Hanya field dari tabel topik yang diterima dari body; field lain diabaikan
    const { kode, nama, tarif, hargaTiket, kategori, alamat, pengelolaId } = req.body;
    const destinasiData = {
      kode,
      nama,
      tarif: tarif !== undefined ? tarif : hargaTiket,
      kategori,
      alamat,
      pengelolaId,
    };

    const data = await Destinasi.create(destinasiData);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const filter = {};

    // Filter dengan query parameter
    if (req.query.kategori) {
      filter.kategori = String(req.query.kategori);
    }
    if (req.query.kota) {
      filter['alamat.kota'] = String(req.query.kota);
    }

    let query = Destinasi.find(filter);

    // Sorting: bila parameter sort dikirim, data diurutkan menaik berdasarkan field tersebut
    if (req.query.sort) {
      const sortField = String(req.query.sort);
      query = query.sort({ [sortField]: 1 });
    }

    const data = await query.exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await Destinasi.findById(req.params.id).populate('pengelolaId', 'kode nama');
    if (!data) {
      return next(errorHttp(404, 'Destinasi tidak ditemukan'));
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};
