const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    nama_hotel: {
        type: String,
        required: [true, 'Hotel harus memiliki nama hotel'],
    },
    rating: {  
        type: Number,
        required: [true, 'Hotel harus memiliki rating']
    },
    alamat: {
        type: String,
        required: [true, 'Hotel harus memiliki alamat'],
    },
    kota: {
        type: String,
        required: [true, 'Hotel harus memiliki kota']
    },
    deskripsi: {
        type: String,
        required: [true, 'Hotel harus memiliki deskripsi']
    },
    harga_termurah: {
        type: Number,
        required: [true, 'Hotel harus memiliki harga_termurah']
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;