const pengelola = require('../models/pengelolaModel');

exports.create = async (req, res) => {
  try {
    const pengelolaDoc = await pengelola.create(req.body);
    res.status(201).json(pengelolaDoc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  res.json(await pengelola.find());
};