import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// api
import { getAllProducts, getLikedProducts } from '../api/products';
import { getMyUserInfos } from '../api/auth';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      const getProducts = async () => {
        const token = localStorage.getItem('token');
        const userData = await getMyUserInfos(token);

        if (!userData) return;

        const productData = await getAllProducts();
        const likedProducts = await getLikedProducts(token);
        if (!productData || !likedProducts) return;

        const displayProducts = productData.filter(
          (product) => product.userId !== userData.id && product.status === 'AVAILABLE'
        );
        setProducts(displayProducts);
        setLikedProducts(likedProducts);
      };
      getProducts();
    }

    setRefresh(false);
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
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
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

        <ProductList products={products} likedProducts={likedProducts} setRefresh={setRefresh} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
