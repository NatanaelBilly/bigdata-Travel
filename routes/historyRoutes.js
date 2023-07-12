const express = require('express');
const historyControllers = require('./../controllers/historyControllers.js');
const auth = require('../middleware/auth');

const router = express.Router();

router
.route('/lihatHistoryPesawat/:id_pengguna')
.get(auth('user'), historyControllers.getTiketPesawat)

router
.route('/lihatHistoryHotel/:id_pengguna')
.get(auth('user'), historyControllers.getTiketHotel)

module.exports = router;