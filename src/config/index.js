require('dotenv').config();

module.exports.port = process.env.PORT;
module.exports.databaseURL = process.env.MONGODB_URI;
module.exports.access_token = process.env.ACCESS_TOKEN;
