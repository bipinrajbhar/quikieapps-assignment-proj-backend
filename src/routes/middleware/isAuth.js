const expressJWT = require('express-jwt');
const config = require('../../config');

module.exports = expressJWT({
  secret: config.access_token,
});
