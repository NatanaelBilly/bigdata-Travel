const mongoose = require('mongoose');

const kursiPesawatSchema = new mongoose.Schema({
    nomor_kursi: {
        type: String,
        required: [true, 'Nomor kursi harus diisi']
    },
    tipe_kursi:{
        type: String,
        required: [true, 'Tipe kursi harus diisi']
    },
    harga_kursi: {
        type: Number,
        required: [true, 'Harga harus diisi']
    },
    status_kursi: {
        type: String,
        required: [true, 'Status harus diisi']
    },
    id_pesawat: {
        type: String,
        required: [true, 'Id pesawat harus diisi']
    }
});

const KursiPesawat = mongoose.model('KursiPesawat', kursiPesawatSchema);

module.exports = KursiPesawat;