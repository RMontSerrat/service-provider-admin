import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

const ProductsListSkeleton = () => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {[...Array(5)].map((_, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12} sm={1}>
            <Skeleton variant="text" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Skeleton variant="text" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Skeleton variant="rectangular" width={100} height={50} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Skeleton variant="text" />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Skeleton variant="circular" width={40} height={40} />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ProductsListSkeleton;