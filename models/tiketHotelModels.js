const mongoose = require('mongoose');

const tiketHotelSchema = new mongoose.Schema({
    tanggal_pemesanan: {
        type: Date,
        required: [true, 'tiket hotel harus memiliki tanggal pemesanan'],
    },
    status_pemesanan: {  
        type: String,
        required: [true, 'tiket hotel harus memiliki status pemesanan']
    },
    nama_pemesan: {
        type: String,
        required: [true, 'tiket hotel harus memiliki nama pemesanan'],
    },
    jenis_kelamin: {
        type: String,
        required: [true, 'tiket hotel harus memiliki jenis kelamin'],
    },
    tanggal_lahir: {
        type: Date,
        required: [true, 'tiket hotel harus memiliki tanggal lahir'],
    },
    email: {
        type: String,
        required: [true, 'tiket hotel harus memiliki email'],
    },
    nomor_telepon: {
        type: String,
        required: [true, 'tiket hotel harus memiliki nomor telepon'],
    },
    tipe_kamar: {
        type: String,
        required: [true, 'tiket hotel harus memiliki tipe kamar'],
    },
    harga: {
        type: Number,
        required: [true, 'tiket hotel harus memiliki harga'],
    },
    lama_menginap: {
        type: Number,
        required: [true, 'tiket hotel harus memiliki lama menginap'],
    },
    tanggal_menginap: {
        type: Date,
        required: [true, 'tiket hotel harus memiliki tanggal menginap'],
    },
    id_voucher: {
        type: String
    },
    id_kamar: {
        type: String,
        ref: 'kamar',
        required: [true, 'tiket hotel harus memiliki id_kamar']
    },
    id_hotel: {
        type: String,
        ref: 'hotel',
        required: [true, 'tiket hotel harus memiliki id_hotel']
    },
    id_pengguna:{
        type: String,
        ref: 'user',
        required: [true, 'tiket hotel harus memiliki id_pengguna']
    }
});

const TiketHotel = mongoose.model('TiketHotel', tiketHotelSchema);

module.exports = TiketHotel;