import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
// @mui
import { Container, Stack, Typography, TextField, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// api
import { createProduct } from '../api/products';

// ----------------------------------------------------------------------

const AddProductsPage = () => {
  const [imageId, setImageId] = useState(1);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(1);
  const [color, setColor] = useState('');

  const colorRgx = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

  const handleImageChange = (event) => {
    if (event.target.value > 0 && event.target.value < 25) setImageId(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    if (event.target.value > 0) setPrice(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleClick = async () => {
    if (name.length > 6 && price > 0 && colorRgx.test(color)) {
      const token = localStorage.getItem('token');

      const data = await createProduct(token, imageId, name, price, color);
      console.log('Create product', data);

      if (data) {
        setImageId(1);
        setName('');
        setPrice(1);
        setColor('');

        toast.success('Product created', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Add Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Add Product
        </Typography>

        <FormControl fullWidth>
          <Stack spacing={3}>
            <TextField id="filled-number" label="Image Id" type="number" value={imageId} onChange={handleImageChange} />
            <TextField
              name="Name"
              label="Product Name"
              value={name}
              onChange={handleNameChange}
              error={name.length < 6}
            />
            <TextField id="filled-number" label="Price" type="number" value={price} onChange={handlePriceChange} />
            <TextField
              name="color"
              label="Color (Hex format)"
              value={color}
              onChange={handleColorChange}
              error={!colorRgx.test(color)}
            />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
              Create
            </LoadingButton>
          </Stack>
        </FormControl>
      </Container>
    </>
  );
};

export default AddProductsPage;
