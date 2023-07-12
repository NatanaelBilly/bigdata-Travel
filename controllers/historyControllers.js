const tiketPesawat = require('./../models/tiketPesawatModels');
const tiketHotel = require('../models/tiketHotelModels');

exports.getTiketPesawat = async (req, res) => {
    try {
        const id_pengguna = req.params.id_pengguna;
        const tiket_pesawat = await tiketPesawat.find({ id_pengguna: id_pengguna});
        
        if(tiket_pesawat.length==0){
            res.status(201).json({
                status: 'success',
                message: 'Tidak ada history pesawat'
            });
        }else{
            res.status(201).json({
                status: 'success',
                tiket_pesawat: tiket_pesawat
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error !');
    }
};

exports.getTiketHotel = async (req, res) => {
    try {
        const id_pengguna = req.params.id_pengguna;
        const tiket_hotel = await tiketHotel.find({ id_pengguna: id_pengguna});
        
        if(tiket_hotel.length==0){
            res.status(201).json({
                status: 'success',
                message: 'Tidak ada history hotel'
            });
        }else{
            res.status(201).json({
                status: 'success',
                tiket_hotel: tiket_hotel
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error !');
    }
};