import { toast } from 'react-toastify';

const createProduct = async (token, imageId, name, price, color) => {
  const res = await fetch('http://localhost:8080/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:8080',
      Authorization: token,
    },
    body: JSON.stringify({
      imageId,
      name,
      price,
      color,
    }),
  });

  const data = await res.json();

  if (res.status !== 201) {
    toast.error(`${res.status}: ${data.message}`, {
      autoClose: 2000,
    });
    return null;
  }

  return data;
};

const getAllProducts = async () => {
  const res = await fetch('http://localhost:8080/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:8080',
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

const getMyProducts = async (token) => {
  const res = await fetch('http://localhost:8080/users/products', {
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

const deleteProduct = async (token, productId) => {
  console.log('deleteProduct', productId, token);
  const res = await fetch(`http://localhost:8080/products/${productId}`, {
    method: 'DELETE',
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

export { createProduct, getAllProducts, getMyProducts, deleteProduct };
