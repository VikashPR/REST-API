const express = require('express');
const subscriber = require('../models/subscriber');
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
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber);
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
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ msg: 'Deleted subscriber' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Middle ware
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ msg: 'cannot find the user ' });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
  res.subscriber = subscriber;
  next();
}




module.exports = router;
