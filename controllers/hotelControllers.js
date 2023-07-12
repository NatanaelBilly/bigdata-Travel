const Hotel = require('../models/hotelModels')
const Kamar = require('../models/kamarModels')
const TiketHotel = require('../models/tiketHotelModels')

//get hotel based on kota dan tanggal mengingap
exports.getHotel = async (req, res) => {
    try {
        const {kota} = req.body;
        const hotels = await Hotel.find({ kota: kota});
        if (hotels == null) {
            return res.status(404).json({
                success: false,
                message: "hotel tidak ditemukan pada filter yang dipilih"
            });
        }
        res.status(200).json({
            success: true,
            data: hotels
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getKamar = async (req, res) => {
    try {
        // const idKamar = req.params.id;
        const {idHotel} = req.body;
        const kamars = await Kamar.find({id_hotel: idHotel, jumlah_kamar_tersisa: { $gt: 0 }});
        if (!kamars) {
            return res.status(404).json({
                success: false,
                message: "Kamar tidak ditemukan pada hotel yang dipilih"
            });
        }
        res.status(200).json({
            success: true,
            data: kamars
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.pesanHotel = async (req, res) => {
    try {
        const { tanggal_pemesanan, status_pemesanan, nama_pemesan, jenis_kelamin, tanggal_lahir, email, nomor_telepon, tipe_kamar, harga, lama_menginap, tanggal_menginap, id_voucher, id_kamar, id_hotel, id_pengguna } = req.body
        const kamar = await Kamar.findById(id_kamar);
        if (!kamar) {
            return res.status(404).json({
                success: false,
                message: 'Kamar tidak ditemukan'
            });
        }

        const tiketHotel = new TiketHotel({ tanggal_pemesanan, status_pemesanan, nama_pemesan, jenis_kelamin, tanggal_lahir, email, nomor_telepon, tipe_kamar, harga, lama_menginap, tanggal_menginap, id_voucher, id_kamar, id_hotel, id_pengguna });
        if(tiketHotel){
            kamar.jumlah_kamar_tersisa -= 1;
            await kamar.save();
            await tiketHotel.save();
        }

        res.status(201).json({
            status: 'success',
            data: {
                tiketHotel
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.cancelPesanan = async (req, res) => {
    try {
        const {id_pesanan} = req.body;
        const pesanan = await TiketHotel.findByIdAndUpdate(id_pesanan,{status_pemesanan:"Dibatalkan"});
       
        if (!pesanan) {
            return res.status(404).json({
                status: 'fail',
                message: 'Pesanan tidak ditemukan!'
            });
        }
        const kamar = await Kamar.findById(pesanan.id_kamar);
        kamar.jumlah_kamar_tersisa += 1;
        await kamar.save();

        res.status(201).json({
            status: 'success',
            message: 'Pesanan berhasil dibatalkan!'
        });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error !');
    }
};


exports.checkout = async (req, res) => {
    const {id_pesanan}=req.body
    try {
        // Dapatkan data pesanan yang akan di-checkout
        const pesanan = await TiketHotel.findById(id_pesanan);

        if (!pesanan) {
            throw new Error('Pesanan tidak ditemukan!');
        }

        // Dapatkan data kamar yang terkait dengan pesanan
        const kamar = await Kamar.findById(pesanan.id_kamar);

        if (!kamar) {
            throw new Error('Kamar tidak ditemukan!');
        }

        // Perbarui jumlah kamar yang tersisa
        kamar.jumlah_kamar_tersisa += 1;
        await kamar.save();

        // Update status pesanan menjadi 'selesai'
        pesanan.status_pemesanan = 'Selesai';
        await pesanan.save();

        res.status(201).json({
            status: 'success',
            message: 'Berhasil Checkout!'
        });
    } catch (err) {
        res.status(500).send('Server error !');
        return err.message;
    }
};