const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
 
    name: { type: String},
    email: { type: String, require: true },
    date: { type: String, require: true },
    banquet: { type: String, require: true },
    guest: { type: String, require: true },
  
    amount: { type: String, require: true },
 payment:{
    type: Boolean,
    default: true,}
     },     { timestamps: true });

const booked = mongoose.model('booked', bookSchema)

module.exports = booked