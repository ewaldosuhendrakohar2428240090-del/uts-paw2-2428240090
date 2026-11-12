function errorHttp(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function notFoundHandler(req, res, next) {
  res.status(404).json({ message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan` });
}

function errorHandler(err, req, res, next) {
  // 1. Body JSON rusak
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Format JSON tidak valid' });
  }

  // 2. ID bukan ObjectId (CastError) -> tanpa menyebut nama model
  if (err.name === 'CastError') {
    return res.status(400).json({ message: `Format ID '${err.value}' tidak valid` });
  }

  // 3. Pelanggaran Schema (ValidationError)
  if (err.name === 'ValidationError') {
    const detail = Object.values(err.errors).map((e) =>
      e.name === 'CastError' ? `Nilai untuk ${e.path} tidak valid` : e.message
    );
    return res.status(400).json({ message: 'Data tidak valid', detail });
  }

  // 4. Nilai unik bentrok (kode error MongoDB 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || err.keyValue || {})[0];
    const message = field ? `Nilai ${field} sudah dipakai` : 'Data duplikat';
    return res.status(409).json({ message });
  }

  // 5. Galat yang dilempar sengaja (mis. 404 data tidak ditemukan)
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // 6. Galat lain yang tidak terduga (500 tanpa stack trace)
  console.error(err);
  return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
}

module.exports = { errorHttp, notFoundHandler, errorHandler };
