import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useProducts } from './useProducts';
import ProductsListSkeleton from './ProductsListSkeleton';

const ProductsList = () => {
  const { data, isLoading, error } = useProducts();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false, filterable: false },
    { field: 'name', headerName: 'Nome', width: 200, sortable: false, filterable: false },
    { field: 'description', headerName: 'Descrição', width: 400, sortable: false, filterable: false },
    {
      field: 'image',
      headerName: 'Imagem',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img src={params.value} alt={params.row.name} style={{ width: '100%', height: 'auto' }} />
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
        <IconButton color="primary" aria-label="edit product">
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
      <DataGrid rows={data || []} columns={columns} />
    </div>
  );
};

export default ProductsList;