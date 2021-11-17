'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tokenSchema = new Schema(
    {
        name: String,
        email: String,
        role: String,
        token: String
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Token', tokenSchema);