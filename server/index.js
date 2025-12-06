require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
const transactionRoutes =require('./routes/transactions');
const budgetRoutes = require('./routes/budgets');
const plaidRoutes = require('./routes/plaid');
const reportRoutes = require('./routes/reports');
const investmentRoutes = require('./routes/investments');
const calculatorRoutes = require('./routes/calculator');

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/plaid', plaidRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/calculator', calculatorRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
