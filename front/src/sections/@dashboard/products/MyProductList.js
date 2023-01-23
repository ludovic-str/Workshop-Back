import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ManageProductCard from './MyProductCard';

// ----------------------------------------------------------------------

MyProductList.propTypes = {
  products: PropTypes.array.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default function MyProductList({ products, setRefresh }) {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ManageProductCard product={product} setRefresh={setRefresh} />
        </Grid>
      ))}
    </Grid>
  );
}
