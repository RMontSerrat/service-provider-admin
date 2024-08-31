'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import {
  IconPlus,
} from "@tabler/icons-react";

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Layout from '../components/shared/Layout';
import OrderList from '../components/orders/OrderList';


const SamplePage = () => {
  const router = useRouter();
  const handleAddProduct = () => {
    router.push('/products/new');
  };

  return (
    <PageContainer title="Lista de pedidos" description="this is Sample page">
      <Layout>
        <Layout.Header>
          <Layout.Title>Pedidos</Layout.Title>
        </Layout.Header>
        <Layout.Container>
        <DashboardCard title="Lista de pedidos" action={
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<IconPlus />}
            onClick={handleAddProduct}
          >
            Novo gift card
          </Button>
        }>
          <OrderList />
        </DashboardCard>
        </Layout.Container>
      </Layout>
    </PageContainer>
  );
};

export default SamplePage;

