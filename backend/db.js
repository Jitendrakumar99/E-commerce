const mongoose = require('mongoose');

const productDB = mongoose.createConnection(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { userDB, productDB };
