import { toast } from 'react-toastify';

export const getUserSales = async (token) => {
  const res = await fetch('http://localhost:8080/users/sales', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:8080',
      Authorization: token,
    },
  });

  const data = await res.json();

  if (res.status !== 200) {
    toast.error(`${res.status}: ${data.message}`, {
      autoClose: 2000,
    });
    return null;
  }

  return data;
};

export const addSale = async (token, amount, name, userId) => {
  const res = await fetch('http://localhost:8080/users/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:8080',
      Authorization: token,
    },
    body: JSON.stringify({
      amount,
      name,
      userId,
    }),
  });

  const data = await res.json();

  if (res.status !== 200) {
    toast.error(`${res.status}: ${data.message}`, {
      autoClose: 2000,
    });
    return null;
  }

  return data;
};
