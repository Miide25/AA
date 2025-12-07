import React, { useState, useEffect } from 'react';
import api from '../api';

const IncomeVsExpense = () => {
  const [data, setData] = useState({ income: 0, expenses: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/reports/income-vs-expense');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Income vs. Expense</h2>
      <p>Income: ${data.income}</p>
      <p>Expenses: ${data.expenses}</p>
    </div>
  );
};

export default IncomeVsExpense;
