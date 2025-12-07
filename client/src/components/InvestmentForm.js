import React, { useState } from 'react';
import api from '../api';

const InvestmentForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/investments', {
        name,
        type,
        quantity,
        purchasePrice,
        purchaseDate,
      });
      console.log(response.data);
      // Clear form
      setName('');
      setType('');
      setQuantity('');
      setPurchasePrice('');
      setPurchaseDate('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Investment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          required
        />
        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
        />
        <button type="submit">Add Investment</button>
      </form>
    </div>
  );
};

export default InvestmentForm;
