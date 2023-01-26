import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import Iconify from '../../../components/iconify';
import { dislikeProduct, likeProduct } from '../../../api/products';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
  likedProducts: PropTypes.array.isRequired,
};

export default function ShopProductCard({ product, likedProducts }) {
  const { id, name, imageId, price, color, likes } = product;
  const alreadyLiked = likedProducts.find((item) => item.productId === id);

  const [isLiked, setIsLiked] = useState(alreadyLiked !== undefined);
  const [likeCount, setLikeCount] = useState(likes);
  console.log(id, name, imageId, price, color, likes);

  const handleLike = async () => {
    const token = localStorage.getItem('token');

    if (isLiked) {
      console.log('unlike');
      await dislikeProduct(token, id);
      setLikeCount(likeCount - 1);
    } else {
      console.log('like');
      await likeProduct(token, id);
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color="info"
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
          style={{ cursor: 'pointer' }}
          onClick={() => console.log('clicked')}
        >
          BUY
        </Label>
        <Iconify
          icon="eva:heart-outline"
          sx={{ width: 16, height: 16, mr: 0.5, top: 16, left: 16, position: 'absolute', zIndex: 9 }}
          style={{ cursor: 'pointer', color: isLiked ? 'red' : 'grey' }}
          onClick={handleLike}
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
          {likeCount} likes
        </Label>
        <StyledProductImg alt={name} src={`/assets/images/products/product_${imageId}.jpg`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

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
