import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// api
import { deleteProduct } from '../../../api/products';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ManageProductCard.propTypes = {
  product: PropTypes.object,
  setRefresh: PropTypes.func.isRequired,
};

export default function ManageProductCard({ product, setRefresh }) {
  const { id, name, imageId, price, color, likes, status } = product;

  const onRemoveClick = async () => {
    const token = localStorage.getItem('token');

    const data = deleteProduct(token, id);

    if (data) {
      toast.success('Product deleted successfully', {
        position: 'top-right',
        autoClose: 2000,
      });
      setRefresh(true);
    }
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color={status === 'AVAILABLE' ? 'success' : 'error'}
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
          style={{ color: 'white' }}
        >
          {status}
        </Label>
        <Iconify
          icon="eva:heart-outline"
          sx={{ width: 16, height: 16, mr: 0.5, top: 16, left: 16, position: 'absolute', zIndex: 9 }}
          style={{ color: 'red' }}
        />
        <Label
          variant="filled"
          color="error"
          sx={{
            zIndex: 9,
            top: 14,
            left: 45,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          {likes} likes
        </Label>
        <StyledProductImg alt={name} src={`/assets/images/products/product_${imageId}.jpg`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Iconify
          icon="eva:trash-2-outline"
          style={{ color: 'red', cursor: 'pointer' }}
          sx={{ width: 16, height: 16, mr: 0.5, bottom: 67, right: 16, position: 'absolute', zIndex: 9 }}
          onClick={onRemoveClick}
        />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={[color]} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            />
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
