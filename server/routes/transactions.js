const express = require('express');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { description, amount, type, date, category } = req.body;
    const transaction = new Transaction({
      description,
      amount,
      type,
      date,
      category,
      user: req.user.userId,
    });
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.userId });
    res.send(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { description, amount, type, date, category } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { description, amount, type, date, category },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).send('Transaction not found');
    }
    res.send(transaction);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!transaction) {
      return res.status(404).send('Transaction not found');
    }
    res.send({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
