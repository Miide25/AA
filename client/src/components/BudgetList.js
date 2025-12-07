import React, { useState, useEffect } from 'react';
import api from '../api';

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await api.get('/api/budgets');
        setBudgets(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBudgets();
  }, []);

  return (
    <div>
      <h2>Budgets</h2>
      <ul>
        {budgets.map((budget) => (
          <li key={budget._id}>
            {budget.category} - Budgeted: ${budget.budgetedAmount}, Actual: $
            {budget.actualAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetList;
