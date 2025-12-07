import React from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';
import PlaidLink from './PlaidLink';
import SpendingByCategory from './SpendingByCategory';
import IncomeVsExpense from './IncomeVsExpense';
import InvestmentForm from './InvestmentForm';
import InvestmentList from './InvestmentList';
import Calculator from './Calculator';

const Dashboard = () => {
  return (
    <div>
      <TransactionForm />
      <TransactionList />
      <PlaidLink />
      <BudgetForm />
      <BudgetList />
      <SpendingByCategory />
      <IncomeVsExpense />
      <InvestmentForm />
      <InvestmentList />
      <Calculator />
    </div>
  );
};

export default Dashboard;
