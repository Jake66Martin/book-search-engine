const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://jake66martin:jakesdu1@jakecluser.dcwjdeg.mongodb.net/googlebooks?retryWrites=true&w=majority" || 'mongodb://127.0.0.1:27017/googlebooks');

module.exports = mongoose.connection;
