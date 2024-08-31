import React from 'react';
import { Card, CardContent, Typography, Grid, Chip } from '@mui/material';

const GiftCardOrderDetails = ({ status, code, balance, expires, purchaser, recipient, message, image }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <img
        src={image}
        alt="Gift Card"
        style={{ width: '100%', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
      />
      <CardContent>
        {/* Informações do Gift Card */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip label={status} color="success" />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
              Code
            </Typography>
            <Typography variant="h6">{code}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
              Balance
            </Typography>
            <Typography variant="h6">{balance}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
              Expires
            </Typography>
            <Typography variant="h6">{expires}</Typography>
          </Grid>
        </Grid>

        {/* Informações Adicionais */}
        <Typography variant="h2" sx={{ mb: 1 }}>
          Primeiro gift card
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          teste
        </Typography>

        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight="medium" color="text.secondary">
              Purchaser
            </Typography>
            <Typography variant="body2">{purchaser}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight="medium" color="text.secondary">
              Recipient
            </Typography>
            <Typography variant="body2">{recipient}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2"  fontWeight="medium" color="text.secondary">
              Message
            </Typography>
            <Typography variant="body2">{message}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GiftCardOrderDetails;