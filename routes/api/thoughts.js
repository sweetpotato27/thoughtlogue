const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Thought = require('../../models/Thought');
const validateThoughtInput = require('../../validation/thoughts');

router.get('/', (req, res) => {
    Thought.find()
        .populate({
            path: 'user', select: 'name'
        })
        .sort({ date: -1 })
        .then(thoughts => res.json(thoughts))
        .catch(err => res.status(404).json({ nothoughtsfound: 'No thoughts found' }));
});

router.get('/user/:user_id', (req, res) => {
    Thought.find({ user: req.params.user_id })
        .populate({
            path: 'user', select: 'name'
        })
        .sort({ date: -1 })
        .then(thoughts => {
            res.json(thoughts);})
        .catch(err =>
            res.status(404).json({ nothoughtsfound: 'No thoughts found from that user' })
        );
});

router.get('/:id', (req, res) => {
    Thought.findById(req.params.id)
        .then(thought => res.json(thought))
        .catch(err => 
            res.status(404).json({ nothoughtfound: 'No thought found with that ID' })
        );
});

router.post('/', 
    passport.authenticate('jwt', {session: false }),
    (req, res) => {
        const { errors, isValid } = validateThoughtInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newThought = new Thought({
            text: req.body.text,
            user: req.user.id
        }); 

        newThought.save().then(thought => res.json(thought));
    });

module.exports = router;