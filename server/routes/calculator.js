const express = require('express');
const { create, all } = require('mathjs');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const math = create(all);
const limitedEvaluate = math.evaluate;

math.import({
  'import': function () { throw new Error('Function import is disabled') },
  'createUnit': function () { throw new Error('Function createUnit is disabled') },
  'evaluate': function () { throw new Error('Function evaluate is disabled') },
  'parse': function () { throw new Error('Function parse is disabled') },
  'simplify': function () { throw new Error('Function simplify is disabled') },
  'derivative': function () { throw new Error('Function derivative is disabled') }
}, { override: true });

router.use(authMiddleware);

router.post('/calculate', (req, res) => {
  try {
    const { expression } = req.body;
    const result = limitedEvaluate(expression);
    res.json({ result });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
