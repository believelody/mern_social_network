const express =require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const randomstring = require('randomstring');

const keys = require('../../config/keys');
const mailer = require('../../misc/mailer');

//  Load Input Validation
const validateRegisterInput = require('../../validations/registerHandler');
const validateLoginInput = require('../../validations/loginHandler');

//  Load User model
const User = require('../../models/User');

//  @routes GET api/users
//  @desc Test route for user
//  @access Public
router.get('/', (req, res) => res.json({ msg: "Users work" }));

//  @routes POST api/users/register
//  @desc Register user
//  @access Public
router.post('/register', (req, res) => {
  let { name, email, password } = req.body;
  let { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      }
      else {
        let avatar = gravatar.url(email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });
        let secretToken = randomstring.generate();

        const newUser = new User({
          name,
          email,
          avatar,
          password,
          secretToken,
          confirmed: false
        });

        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err
          };
          newUser.password = hash;

          newUser
            .save()
            .then(user => {
              //  Compose email
              const content = `
                <h2>Hi there</h2>
                <br />
                <strong>Thanks you for registering</strong>
                <br />
                <br />
                <p>Please verify your email by cliking on this link below:</p>
                <br />
                <a href="http://localhost:3000/verify/${secretToken}">http://localhost:3000/verify/${secretToken}</a>
              `;
              //  Send email (don't forget to replace 'believelody@gmail.com' by req.body.email in production case)
              mailer.sendEmail('admin@gs.com', 'believelody@gmail.com', 'Verify your email', content);
              res.json('Thanks for your subscription! Please verify your email!!')
            })
            .catch(err => console.log(err));
        }));
      }
    });
});

//  @routes POST api/users/login
//  @desc Login user / Return JWT Token
//  @access Public
router.post('/login', (req, res) => {
  let { email, password } = req.body;
  let { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find User by Email
  User.findOne({email})
    .then(user => {
      //  Check user
      if (!user) {
        errors.email = "User not found"
        return res.status(400).json(errors);
      }

      //Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //  Check if user are confirmed
            if (!user.confirmed) {
              errors.notconfirmed = "You need to verify your email before continue";
              return res.status(400).json(errors);
            }
            else {
              // User Matched
              const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
              }; // Create jwt payload

              // Sign Token
              jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
                res.json({success: true, token: `Bearer ${token}`});
              });
            }
          }
          else {
            errors.password = "Invalid password";
            return res.status(400).json(errors);
          }
        });
    });
});

//  @routes GET api/users/current
//  @desc Return Current User
//  @access Private
router.get('/current', passport.authenticate('jwt', {session :false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar
  });
});

router.post('/confirmation', (req, res) => {
  const token = req.body.token;
  User.findOneAndUpdate(
    { secretToken: token },
    { secretToken: "", confirmed: true},
    { new: true }
  )
  .then(user => user ? res.json(user) : res.status(400).json({}));
});

module.exports = router;
