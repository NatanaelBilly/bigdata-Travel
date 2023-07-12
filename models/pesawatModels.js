const mongoose = require('mongoose');

const pesawatSchema = new mongoose.Schema({
    maskapai: {
        type: String,
        required: [true, 'Maskapai harus diisi']
    },
    tempat_berangkat:{
        type: String,
        required: [true, 'Tempat keberangkatan harus diisi']
    },
    tujuan_berangkat: {
        type: String,
        required: [true, 'Tujuan keberangkatan harus diisi']
    },
    tanggal_jam_berangkat: {
        type: Date,
        required: [true, 'Tanggal dan jam keberangkatan harus diisi']
    }
});

const Pesawat = mongoose.model('Pesawat', pesawatSchema);

module.exports = Pesawat;