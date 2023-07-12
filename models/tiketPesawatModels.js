const mongoose = require('mongoose');

const tiketPesawatSchema = new mongoose.Schema({
    id_pengguna: {
        type: String,
        required: [true, 'Id pengguna harus diisi']
    },
    tanggal_pemesanan: {
        type: Date,
        required: [true, 'Tanggal pemesanan harus diisi']
    },
    status_pemesanan:{
        type: String,
        required: [true, 'Status harus diisi']
    },
    nama_depan: {
        type: String,
        required: [true, 'Nama depan harus diisi']
    },
    nama_belakang: {
        type: String,
        required: [true, 'Nama belakang harus diisi']
    },
    jenis_kelamin: {
        type: String,
        required: [true, 'Jenis kelamin harus diisi']
    },
    tanggal_lahir: {
        type: Date,
        required: [true, 'Tanggal lahir harus diisi']
    },
    email: {
        type: String,
        required: [true, 'Email harus diisi']
    },
    nomor_telepon: {
        type: String,
        required: [true, 'Nomor telepon harus diisi']
    },
    id_kursi: {
        type: String,
        required: [true, 'Id kursi harus diisi']
    },
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
    },
    id_voucher: {
        type: String
    }
});

const TiketPesawat = mongoose.model('TiketPesawat', tiketPesawatSchema);

module.exports = TiketPesawat;