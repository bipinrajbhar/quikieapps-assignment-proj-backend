const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/user');

module.exports.signup = async (req, res) => {
  const { username, email, password, userImg } = req.body;

  console.log(username, email, password, userImg);

  const user = await User.findOne({ email });

  if (user) {
    res.status(400).send({
      msg: 'Hmm, That eamil already exists',
    });
  } else {
    const newUser = new User({
      username,
      email,
      password,
      userImg,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            {
              id: user.id,
            },
            config.access_token,
            {
              expiresIn: '1d',
            },
            (err, token) => {
              if (err) throw err;
              res.status(201).json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  userImg: user.userImg,
                },
              });
            }
          );
        });
      });
    });
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res
      .status(400)
      .json({ msg: "That email doesn't exits in the database." });

  bcrypt.compare(password, user.password).then((isMatch) => {
    if (!isMatch)
      return res
        .status(400)
        .json({ msg: 'That email and password combination is in correct.' });

    jwt.sign(
      {
        id: user.id,
      },
      config.access_token,
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            userImg: user.userImg,
          },
        });
      }
    );
  });
};

module.exports.user = async (req, res) => {
  const user = await User.findById(req.user.id);

  const { id, username, userImg } = user;

  res.send({
    id,
    username,
    userImg,
  });
};
