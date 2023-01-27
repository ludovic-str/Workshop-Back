import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  likedProducts: PropTypes.array.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default function ProductList({ products, likedProducts, setRefresh, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} likedProducts={likedProducts} setRefresh={setRefresh} />
        </Grid>
      ))}
    </Grid>
  );
}
