const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required.'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tanggal_lahir:{
        type: Date,
        required: [true],
        unique: false
    },
    email: {
        type: String,
        required: [true],
        unique: true
    },
    jenis_kelamin: {
        type: String,
        required: [true],
        unique: false
    },
    nomor_telepon: {
        type: String,
        required: [true],
        unique: true
    },
    alamat: {
        type: String,
        required: [true],
        unique: false
    },
    role:{
        type: String,
        required: [true],
        unique: false
    }
});

userSchema.pre('save', function(next){
    const user = this;

    if (!user.isModified('password')){
        return next();
    }
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }

        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function (password, callback){
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;