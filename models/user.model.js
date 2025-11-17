const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 100,
        required: true,
        unique: true
    },
    numCDI: {
        type: Number,
        trim: true,
        minlength: 5,
        maxlength: 100,
        required: true,
        unique: true
    },
    typeUser: {
        type: String,
        enum: ["Administrateur", "Cuisinier", "Client"],
        required: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = { User };