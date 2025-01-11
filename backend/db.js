const mongoose = require('mongoose');

const userDB = mongoose.createConnection('mongodb+srv://jitendrasharma6839:asqxV5qUgm4xqwPu@cluster0.kqbc3.mongodb.net/UserData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productDB = mongoose.createConnection('mongodb+srv://jitendrasharma6839:asqxV5qUgm4xqwPu@cluster0.kqbc3.mongodb.net/DataBase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { userDB, productDB };
