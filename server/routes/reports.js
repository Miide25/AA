const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/spending-by-category', async (req, res) => {
  try {
    const spendingByCategory = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.userId), type: 'expense' } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
    ]);
    res.json(spendingByCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/income-vs-expense', async (req, res) => {
  try {
    const income = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.userId), type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const expenses = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.userId), type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    res.json({
      income: income.length > 0 ? income[0].total : 0,
      expenses: expenses.length > 0 ? expenses[0].total : 0,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
