import React, { useState, useEffect } from 'react';
import api from '../api';

const SpendingByCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/reports/spending-by-category');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Spending By Category</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item._id}: ${item.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpendingByCategory;
