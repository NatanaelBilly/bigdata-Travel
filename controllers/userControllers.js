const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const User = require('./../models/userModels');

dotenv.config ({ path: './config.env'});

exports.createUser = async (req, res) => {
    const { username, email, password, jenis_kelamin, tanggal_lahir, nomor_telepon, alamat, role }  = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'You already have an account.'
            });
        }

        const newUser = new User ({ username, email, password, jenis_kelamin, tanggal_lahir, nomor_telepon, alamat, role });
        await newUser.save();

        res.status(201).json({
            status: 'success',
            data: {
                user:newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credential.'
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid credential'
            });
        }

        const payload = {
            user: {
              id: user.id,
              name: user.username,
              email: user.email,
              role: user.role
            }
          };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.EXPIRESIN });

        res.status(200).json({
            status: 'success',
            user: user,
            token: token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.'});
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        res.status(201).json({
            status: 'success',
            user: user
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error !');
    }
};

exports.updateProfile = async (req, res) => {
    const id = req.params.id;
    const update_profile = {role:"user"}
    const{ username, password, tanggal_lahir, email, jenis_kelamin, nomor_telepon, alamat } = req.body
    if(password!=null){
        res.status(500).json({
            status: 'Error',
            message: 'Password tidak boleh di ubah!'
        });
    } if(username!=null){
        update_profile.username = username
    }  if(tanggal_lahir!=null){
        update_profile.tanggal_lahir = tanggal_lahir
    } if(email!=null){
        update_profile.email = email
    } if(jenis_kelamin!=null){
        update_profile.jenis_kelamin = jenis_kelamin
    } if(nomor_telepon!=null){
        update_profile.nomor_telepon = nomor_telepon
    } if(alamat!=null){
        update_profile.alamat = alamat
    } 
    
    try {
        const updated_profile = await User.findByIdAndUpdate(id, update_profile);

        if (updated_profile!=null) {
            res.status(201).json({
                status: 'success',
                message: 'Profile berhasil di update!'
            });
        } else {
            res.status(201).json({
                status: 'success',
                message: 'Pengguna tidak ditemukan!'
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error !');
    }
};

exports.lupaPassword = async (req, res) => {
    const{ new_password, email } = req.body
    
    try {
        const hashed_pass = await bcrypt.hash(new_password, 10);
        console.log(hashed_pass);
        
        const updated_pass_user = await User.findOneAndUpdate({email :email}, {password: hashed_pass},{useFindAndModify: false});

        if (updated_pass_user!=null) {
            res.status(201).json({
                status: 'success',
                message: 'Password berhasil dirubah!'
            });
        } else {
            res.status(201).json({
                status: 'success',
                message: 'Pengguna tidak ditemukan!'
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error !');
    }
};
