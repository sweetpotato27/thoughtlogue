const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// passport current
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    });
})

/* get all users */
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});

/* get a single user */
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => 
            res.status(404).json({ nouserfound: 'No user found with that ID' })
        );
});

/* update user */
router.route('/').put((req, res) => {
    let myquery = { _id: req.body.userId };
    let valuesToUpdate = { $set: {font: req.body.font, background: req.body.background}};
    User.updateOne(myquery, valuesToUpdate, (err, res) => {
        if (err) throw err;
        console.log("document updated");
    })
    res.send('Got a PUT request at /users/');
    // User.findById(req.body.userId)
    //     .then(user => {
    //         console.log(user);
    //         user.updateOne({background: req.body.background})
    //             .then(user.save())
    //     })
})

// register
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ name: req.body.name })
        .then(user => {
            if (user) {
                // Throw a 400 error if the email address already exists
                errors.name = "User already exists";
                return res.status(400).json(errors);
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = { id: user.id, name: user.name };

                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });

});

router.post('/login', (req, res) => {
    const {errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const name = req.body.name;
    const password = req.body.password;

    User.findOne({ name })
        .then(user => {
            if (!user) {
                errors.name = "This user does not exist";
                return res.status(400).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { 
                            id: user.id, 
                            name: user.name,
                            background: user.background,
                            font: user.font 
                        };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // Tell the key to expire in one hour
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        errors.password = "Incorrect password";
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

module.exports = router;