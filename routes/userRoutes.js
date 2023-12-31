const express = require('express');
const userControllers = require('./../controllers/userControllers.js');
const auth = require('../middleware/auth');

const router = express.Router();

router
.route('/register')
.post(userControllers.createUser)

router
.route('/login')
.post(userControllers.login)

router
.route('/lupaPassword')
.put(userControllers.lupaPassword)

router
.route('/getProfile/:id')
.get(auth("all_user"), userControllers.getProfile)

router
.route('/updateProfile/:id')
.put(auth("all_user"), userControllers.updateProfile);

module.exports = router;