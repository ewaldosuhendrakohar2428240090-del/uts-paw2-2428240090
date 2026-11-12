const Pengelola = require('../models/pengelolaModel');

exports.create = async (req, res, next) => {
  try {
    const { kode, nama } = req.body;
    const pengelolaDoc = await Pengelola.create({ kode, nama });
    res.status(201).json(pengelolaDoc);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await Pengelola.find().sort({ kode: 1 });
    res.json(data);
  } catch (err) {
    next(err);
  }
};
