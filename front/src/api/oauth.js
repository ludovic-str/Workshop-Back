import { toast } from 'react-toastify';

export const getGoogleAuthUrl = async () => {
  const res = await fetch('http://localhost:8080/oauth/google/link', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:8080',
    },
  });

  const data = await res.text();

  if (res.status !== 200) {
    toast.error(`${res.status}: ${data.message}`, {
      autoClose: 2000,
    });
    return null;
  }

  return data;
};

export const connectGoogleAccount = async (code) => {
  const res = await fetch('http://localhost:8080/oauth/google/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:8080',
    },
    body: JSON.stringify({
      code,
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
