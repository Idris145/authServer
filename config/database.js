var mongoUrl = 'mongodb+srv://bnw:bnw123456789@bnw.r4qwm.mongodb.net/test';
var mongoose = require('mongoose');

module.exports =function () {
        mongoose.connect(mongoUrl, {useUnifiedTopology: true});
        mongoose.connection.once('open', function () {
            console.log('Connected to MongoDB');
        }).on('error', function (error) {
            console.log('Connection error:', error);
        });
}

