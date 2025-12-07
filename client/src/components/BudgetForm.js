import React, { useState } from 'react';
import api from '../api';

const BudgetForm = () => {
  const [category, setCategory] = useState('');
  const [budgetedAmount, setBudgetedAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/budgets', {
        category,
        budgetedAmount,
      });
      console.log(response.data);
      // Clear form
      setCategory('');
      setBudgetedAmount('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Budget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budgeted Amount"
          value={budgetedAmount}
          onChange={(e) => setBudgetedAmount(e.target.value)}
          required
        />
        <button type="submit">Create Budget</button>
      </form>
    </div>
  );
};

export default BudgetForm;
