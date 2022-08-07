const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
});

// Getting one
router.get('/:id', (req, res) => {
  res.send(req.params.id);
});

// Creating one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Updating one
router.patch('/:id', (req, res) => {});

// Deleting one
router.delete('/:id', (req, res) => {});
module.exports = router;
