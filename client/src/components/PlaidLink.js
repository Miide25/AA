import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import api from '../api';

const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await api.post('/api/plaid/create_link_token');
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.error(error);
      }
    };
    createLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      api.post('/api/plaid/exchange_public_token', { public_token });
    },
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default PlaidLink;
