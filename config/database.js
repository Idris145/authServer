var mongoUrl = 'mongodb+srv://HeelpMee:123456789a@cluster0.r4qwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var mongoose = require('mongoose');

module.exports =function () {
        mongoose.connect(mongoUrl, {useUnifiedTopology: true});
        mongoose.connection.once('open', function () {
            console.log('Connected to MongoDB');
        }).on('error', function (error) {
            console.log('Connection error:', error);
        });
}

