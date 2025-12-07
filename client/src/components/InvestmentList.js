import React, { useState, useEffect } from 'react';
import api from '../api';

const InvestmentList = () => {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await api.get('/api/investments');
        setInvestments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvestments();
  }, []);

  return (
    <div>
      <h2>Investments</h2>
      <ul>
        {investments.map((investment) => (
          <li key={investment._id}>
            {investment.name} ({investment.type}) - {investment.quantity} @ $
            {investment.purchasePrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvestmentList;
