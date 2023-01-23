import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, MyProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// api
import { getMyProducts } from '../api/products';

// ----------------------------------------------------------------------

export default function MyProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      const getProducts = async () => {
        const token = localStorage.getItem('token');
        const myProducts = await getMyProducts(token);

        if (!myProducts) return;

        setProducts(myProducts);
      };

      getProducts();
      setRefresh(false);
    }
  }, [refresh]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Manage Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Manage Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <MyProductList products={products} setRefresh={setRefresh} />
      </Container>
    </>
  );
}
