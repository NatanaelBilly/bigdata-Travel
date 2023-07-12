const express = require('express');
const pesawatControllers = require('./../controllers/pesawatControllers.js');
const auth = require('../middleware/auth');

const router = express.Router();

router
.route('/')
.get(auth('user'), pesawatControllers.lihatPesawat)

router
.route('/kursi/:id')
.get(auth('user'), pesawatControllers.lihatKursi)

router
.route('/pesan')
.post(auth('user'), pesawatControllers.pesanPesawat)

router
.route('/batal')
.put(auth('user'), pesawatControllers.batalPesawat)

router
.route('/selesai')
.put(auth('user'), pesawatControllers.selesaiPesawat)

module.exports = router;