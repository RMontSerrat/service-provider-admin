'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

import { useParams, useRouter } from 'next/navigation';
import Layout from '@/app/(DashboardLayout)/components/shared/Layout';
import OrderPage from '@/app/(DashboardLayout)/components/orders/Order';


const SamplePage = () => {
  const params = useParams();

  return (
    <PageContainer title="Pedido" description="Detalhes do pedido">
      <Layout>
        <Layout.Header>
          <Layout.Title>Pedido #{params.orderId}</Layout.Title>
        </Layout.Header>
        <Layout.Container>
          <OrderPage />
        </Layout.Container>
      </Layout>
    </PageContainer>
  );
};

export default SamplePage;

