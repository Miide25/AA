const express = require('express');
const Investment = require('../models/Investment');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { name, type, quantity, purchasePrice, purchaseDate } = req.body;
    const investment = new Investment({
      name,
      type,
      quantity,
      purchasePrice,
      purchaseDate,
      user: req.user.userId,
    });
    await investment.save();
    res.status(201).send(investment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.user.userId });
    res.send(investments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, type, quantity, purchasePrice, purchaseDate } = req.body;
    const investment = await Investment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { name, type, quantity, purchasePrice, purchaseDate },
      { new: true }
    );
    if (!investment) {
      return res.status(404).send('Investment not found');
    }
    res.send(investment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const investment = await Investment.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!investment) {
      return res.status(404).send('Investment not found');
    }
    res.send({ message: 'Investment deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
