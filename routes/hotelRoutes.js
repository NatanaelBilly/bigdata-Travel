const express = require('express');
const hotelControllers = require('./../controllers/hotelControllers.js');
const auth = require('../middleware/auth');

const router = express.Router();

router
.route('/lihatHotel')
.get(auth('user'), hotelControllers.getHotel)

router
.route('/lihatKamar')
.get(auth('user'), hotelControllers.getKamar )

router
.route('/pesanHotel')
.post(auth('user'), hotelControllers.pesanHotel)

router
.route('/cancelPesanan')
.put(auth('user'), hotelControllers.cancelPesanan)

router
.route('/checkout')
.put(auth('all_user'), hotelControllers.checkout)

module.exports = router;