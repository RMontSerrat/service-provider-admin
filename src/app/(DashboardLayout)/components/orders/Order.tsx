import React from 'react';
import { Grid, Button, Card, CardContent, Typography, Divider, TextField, Box } from '@mui/material';
import GiftCardOrderDetails from './GiftCardOrderDetails';


interface OrderDetailsProps {
  orderId: string;
  placedDate: string;
  paymentMethod: string;
  paymentReference: string;
  promotions: string;
  items: { name: string; price: number }[];
}

const OrderDetails = ({ orderId, placedDate, paymentMethod, paymentReference, promotions, items }: OrderDetailsProps) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Order #{orderId}</Typography>
        <Typography variant="body2">Placed: {placedDate}</Typography>
        <Typography variant="body2">Paid using: {paymentMethod}</Typography>
        <Typography variant="body2">Payment reference: {paymentReference}</Typography>
        <Typography variant="body2">Promotions applied: {promotions}</Typography>
        
        <Divider sx={{ my: 2 }} />
        
        {items.map((item, index) => (
          <div key={index}>
            <Typography variant="body2">{item.name}: {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
          </div>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6">
          Total paid: {items.reduce((acc, item) => acc + item.price, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Componente para as Notas
const NotesSection = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Notes</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Add a private note to this order..."
          variant="outlined"
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Add
        </Button>
      </CardContent>
    </Card>
  );
};

// Componente principal que junta tudo
const Order = () => {
  const giftCard = {
    status: 'Active',
    image: 'https://cdn.giftup.app/web-assets/voucher-templates/15075ece-3241-4653-81d2-a11f748ab52c.png',
    code: '9WQ3E',
    balance: 'R$ 120,00',
    expires: 'Never',
    purchaser: 'John Doe',
    recipient: 'Jane Doe',
    message: 'Happy Birthday!',
  };

  const order = {
    orderId: '10001',
    placedDate: '16 agosto 2024 14:17',
    paymentMethod: 'Stripe',
    paymentReference: 'ch_3PoTmfd5HuGbZhy0wFECsZL',
    promotions: 'Easy Gift promocao',
    items: [
      { name: 'Gift card 9WQ3E', price: 120.00 },
      { name: 'Discount', price: -6.00 }
    ]
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <GiftCardOrderDetails {...giftCard} />
          
        </Grid>
        <Grid item xs={12} md={4}>
        <OrderDetails {...order} />
        <NotesSection />
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Button variant="contained" fullWidth sx={{ mb: 1 }}>Edit gift card...</Button>
              <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Email...</Button>
              <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Download</Button>
              <Button variant="contained" color="error" fullWidth>Void</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;