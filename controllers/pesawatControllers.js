const dotenv = require('dotenv');
const Pesawat = require('./../models/pesawatModels');
const KursiPesawat = require('./../models/kursiPesawatModels');
const TiketPesawat = require('./../models/tiketPesawatModels');

dotenv.config ({ path: './config.env'});

exports.lihatPesawat = async (req, res) => {
    //meminta filter dari body
    const {tempat_berangkat, tujuan_berangkat, tanggal_jam_berangkat}  = req.body;

    try {
        //search pesawat sesuai filter
        const arrpesawat = await Pesawat.find({tempat_berangkat: tempat_berangkat, tujuan_berangkat: tujuan_berangkat, tanggal_jam_berangkat: {$gte: tanggal_jam_berangkat}});

        if (arrpesawat) {
            return res.status(201).json({
                status: 'success',
                data: {
                    pesawat: arrpesawat
                }
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.lihatKursi = async (req, res) => {
    //meminta id pesawat yang akan dilihat kursinya
    const id_pesawat  = req.params.id;
    try {
        //search kursi pada pesawat tersebut yang kosong
        const arrkursi = await KursiPesawat.find({id_pesawat: id_pesawat, status_kursi: 'Kosong'});

        if (arrkursi) {
            return res.status(201).json({
                status: 'success',
                data: {
                    kursi: arrkursi
                }
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.pesanPesawat = async (req, res) => {
    //minta detail pemesanan dari body
    const {id_pengguna, id_kursi, tanggal_pemesanan, status_pemesanan, nama_depan, nama_belakang, jenis_kelamin, tanggal_lahir, email, nomor_telepon, id_voucher}  = req.body;

    try {
        //cari kursi yang ingin dipesan
        const kursi = await KursiPesawat.findById(id_kursi).select('');

        if (!kursi) {
            return res.status(400).json({
                status: 'fail',
                message: 'Error menemukan kursi pesawat'
            });
        }

        //cari pesawat yang memiliki kursi tersebut
        const pesawat = await Pesawat.findById(kursi.id_pesawat).select('');

        if (!kursi) {
            return res.status(400).json({
                status: 'fail',
                message: 'Error menemukan pesawat'
            });
        }

        //ambil data dari kursi yang akan disimpan dalam tiket
        // const id_kursi = kursi._id;
        const nomor_kursi = kursi.nomor_kursi;
        const tipe_kursi = kursi.tipe_kursi;
        const harga_kursi = kursi.harga_kursi;

        //ambil data dari pesawat yang akan disimpan dalam tiket
        const maskapai = pesawat.maskapai;
        const tempat_berangkat = pesawat.tempat_berangkat;
        const tujuan_berangkat = pesawat.tujuan_berangkat;
        const tanggal_jam_berangkat = pesawat.tanggal_jam_berangkat;

        //isi data dalam tiket lalu insert
        const pesanan = new TiketPesawat ({id_pengguna, tanggal_pemesanan, status_pemesanan, nama_depan, nama_belakang, jenis_kelamin, tanggal_lahir, email, nomor_telepon, id_kursi, nomor_kursi, tipe_kursi, harga_kursi, maskapai, tempat_berangkat, tujuan_berangkat, tanggal_jam_berangkat, id_voucher});
        
        //update kursi yang dipesan menjadi terisi
        const update_kursi = await KursiPesawat.findByIdAndUpdate(id_kursi, {status_kursi:"Terisi"});
        
        if (!update_kursi) {
            return res.status(400).json({
                status: 'fail',
                message: 'Error update kursi'
            });
        } else {
            //update voucher menjadi sudah tidak berlaku
            if (id_voucher != '') {
                kuponControllers.updateKupon(id_voucher, 'Tidak Berlaku');
            }

            await pesanan.save();
            return res.status(200).json({
                status: 'success',
                message: 'Berhasil update kursi'
            });
        }
        
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.batalPesawat = async (req, res) => {
    //minta id tiket yang akan dibatalkan
    const {id_tiket_pesawat}  = req.body;

    try {
        //cari tiket yang akan dibatalkan
        const tiket = await TiketPesawat.findById(id_tiket_pesawat).select('');
        
        if (!tiket) {
            return res.status(400).json({
                status: 'fail',
                message: 'Error menemukan id tiket pesawat'
            });
        }
        
        //update kursi yang dipesan tiket tersebut menjadi kosong
        const id_kursi = tiket.id_kursi;
        const update_kursi = await KursiPesawat.findByIdAndUpdate(id_kursi, {status_kursi:"Kosong"});

        if (!update_kursi) {
            return res.status(400).json({
                status: 'fail',
                message: 'Error update kursi pesawat'
            });
        }
        
        //update tiket menjadi dibatalkan
        const update_tiket = await TiketPesawat.findByIdAndUpdate(id_tiket_pesawat, {status_pemesanan:"Dibatalkan"});

        const id_voucher = tiket.id_voucher;

        if (!update_tiket) {
            return res.status(400).json({
                status: 'fail',
                message: 'Error update tiket pesawat'
            });
        } else {
            //update voucher menjadi berlaku kembali
            if (id_voucher != '') {
                const update_kupon = await Kupon.findByIdAndUpdate(id_voucher, {statusPenggunaan:"Berlaku"});

                if (!update_kupon) {
                    return res.status(400).json({
                        status: 'fail',
                        message: 'Error update kupon'
                    });
                }
            }
            
            return res.status(200).json({
                status: 'success',
                message: 'Berhasil update tiket'
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.selesaiPesawat = async (req, res) => {
    //minta id tiket yang sudah selesai pesanannya
    const {id_tiket_pesawat}  = req.body;

    try {
        //cari tiket yang sudah selesai pesanannya
        const tiket = await TiketPesawat.findById(id_tiket_pesawat).select('');
        
        if (!tiket) {
            return res.status(400).json({
                status: 'fail',
                message: 'Error menemukan id tiket pesawat'
            });
        }
        
        //update kursi yang dipesan tiket tersebut menjadi kosong
        const id_kursi = tiket.id_kursi;
        const update_kursi = await KursiPesawat.findByIdAndUpdate(id_kursi, {status_kursi:"Kosong"});

        if (!update_kursi) {
            return res.status(400).json({
                status: 'fail',
                message: 'Error update kursi pesawat'
            });
        }
        
        //update tiket menjadi selesai
        const update_tiket = await TiketPesawat.findByIdAndUpdate(id_tiket_pesawat, {status_pemesanan:"Selesai"});

        if (!update_tiket) {
            return res.status(400).json({
                status: 'fail',
                message: 'Error update tiket pesawat'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Berhasil update tiket'
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};