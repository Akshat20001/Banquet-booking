const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String
       
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
      
    },
    password: {
        type: String,
      
    },
    

    isVerified: {
        type: Boolean,
        default: false,
    },

    googleId: {
        type: String,
    },
    provider: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);