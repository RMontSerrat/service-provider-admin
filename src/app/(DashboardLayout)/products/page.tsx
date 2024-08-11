'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import ProductsList from '@/app/(DashboardLayout)/components/products/ProductsList';
import {
  IconPlus,
} from "@tabler/icons-react";

import { Button } from '@mui/material';
import ProductFormDrawer from "../components/products/ProductFormDrawer";
import { useState } from "react";


const SamplePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAddProduct = () => {
    setDrawerOpen(true);
  };

  const handleSubmit = (data) => {
    setDrawerOpen(false);
  };

  return (
    <PageContainer title="Produtos" description="this is Sample page">
      <DashboardCard title="Produtos" action={
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<IconPlus />}
          onClick={handleAddProduct}
        >
          Novo Produto
        </Button>
      }>
        <ProductsList />        
      </DashboardCard>
      <ProductFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
      />

    </PageContainer>
  );
};

export default SamplePage;

