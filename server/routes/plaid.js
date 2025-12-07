const express = require('express');
const { PlaidApi, PlaidEnvironments } = require('plaid');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

const plaidClient = new PlaidApi({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: PlaidEnvironments[process.env.PLAID_ENV],
});

router.use(authMiddleware);

router.post('/create_link_token', async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: req.user.userId,
      },
      client_name: 'Financial Tracker',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/exchange_public_token', async (req, res) => {
  try {
    const { public_token } = req.body;
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    await User.findByIdAndUpdate(req.user.userId, {
      plaidAccessToken: response.data.access_token,
    });
    res.json({ message: 'Public token exchanged successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/transactions', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const user = await User.findById(req.user.userId);
    if (!user || !user.plaidAccessToken) {
      return res.status(400).send('No access token found for user.');
    }
    const response = await plaidClient.transactionsGet({
      access_token: user.plaidAccessToken,
      start_date: start_date,
      end_date: end_date,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
