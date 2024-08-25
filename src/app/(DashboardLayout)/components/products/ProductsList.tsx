'use client';

import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Alert, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useProducts } from './useProducts';
import ProductsListSkeleton from './ProductsListSkeleton';
import { useRouter } from 'next/navigation';

const ProductsList = () => {
  const router = useRouter();
  const { products, isLoading, error } = useProducts();

  const handleEditProduct = (id: string) => {
    router.push(`/products/${id}`);
  }

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Nome', 
      flex: 1, 
      sortable: false, 
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <img src={params.row.image} alt={params.value} style={{ width: '60px', height: 'auto' }} />
          <span>{params.value}</span>
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: 'Preço',
      width: 120,
      type: 'number',
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(params.value);
      },
    },
    {
      field: 'edit',
      headerName: 'Editar',
      width: 100,
      renderCell: (params) => (
        <IconButton color="primary" aria-label="edit product" onClick={
          () => handleEditProduct(params.row.id.toString())
        }>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  if (isLoading) {
    return <ProductsListSkeleton />;
  }

  if (error) {
    return <Alert severity="error">Failed to load products</Alert>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={products || []} columns={columns} />
    </div>
  );
};

export default ProductsList;