'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import ProductsList from '@/app/(DashboardLayout)/components/products/ProductsList';
import {
  IconPlus,
} from "@tabler/icons-react";

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Layout from '../components/shared/Layout';


const SamplePage = () => {
  const router = useRouter();
  const handleAddProduct = () => {
    router.push('/products/new');
  };

  return (
    <PageContainer title="Gerenciamento de produtos" description="this is Sample page">
      <Layout>
        <Layout.Header>
          <Layout.Title>Produtos</Layout.Title>
        </Layout.Header>
        <Layout.Container>
        <DashboardCard title="Lista de gift cards" action={
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
          <ProductsList />        
        </DashboardCard>
        </Layout.Container>
      </Layout>
    </PageContainer>
  );
};

export default SamplePage;

