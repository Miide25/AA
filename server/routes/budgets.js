const express = require('express');
const Budget = require('../models/Budget');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { category, budgetedAmount } = req.body;
    const budget = new Budget({
      category,
      budgetedAmount,
      user: req.user.userId,
    });
    await budget.save();
    res.status(201).send(budget);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.userId });
    res.send(budgets);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { category, budgetedAmount } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { category, budgetedAmount },
      { new: true }
    );
    if (!budget) {
      return res.status(404).send('Budget not found');
    }
    res.send(budget);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!budget) {
      return res.status(404).send('Budget not found');
    }
    res.send({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
