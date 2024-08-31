'use client';

import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Box, Typography, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useOrders } from './useOrders';
import DataGridSkeleton from '../shared/DataGridSkeleton';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

const OrderList = () => {
  const router = useRouter();
  const { orders, isLoading } = useOrders();

  const handleEditOrder = (id: number) => {
    router.push(`/orders/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'used':
        return 'default';
      case 'canceled':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'placed',
      headerName: 'Data de Pedido',
      width: 180,
      type: 'dateTime',
      sortable: true,
      filterable: true,
      valueGetter: (params) => new Date((params as any).value), // Converte a string ISO para um objeto Date
      valueFormatter: (params) => dayjs((params as any).value).format('DD/MM/YYYY HH:mm'), // Formata a data
    },
    { 
      field: 'code', 
      headerName: 'Código', 
      flex: 1, 
      sortable: true, 
      filterable: true,
    },
    {
      field: 'purchaser',
      headerName: 'Comprador',
      flex: 1,
      sortable: true,
      filterable: true,
      renderCell: (params) => (
        <Box display="flex" flexDirection="column">
          <Typography variant="body2">{params.value.name}</Typography>
          <Typography variant="caption" color="textSecondary">{params.value.email}</Typography>
        </Box>
      ),
    },
    {
      field: 'recipient',
      headerName: 'Destinatário',
      flex: 1,
      sortable: true,
      filterable: true,
      renderCell: (params) => (
        <Box display="flex" flexDirection="column">
          <Typography variant="body2">{params.value.name}</Typography>
          <Typography variant="caption" color="textSecondary">{params.value.email}</Typography>
        </Box>
      ),
    },
    {
      field: 'balance',
      headerName: 'Saldo',
      width: 120,
      type: 'number',
      sortable: true,
      filterable: true,
      renderCell: (params) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(params.value);
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      sortable: true,
      filterable: true,
      renderCell: (params) => (
        <Chip 
          label={params.value.charAt(0).toUpperCase() + params.value.slice(1)} 
          color={getStatusColor(params.value)} 
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 100,
      renderCell: (params) => (
        <IconButton color="primary" aria-label="edit order" onClick={
          () => handleEditOrder(params.row.id)
        }>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  if (isLoading) {
    return <DataGridSkeleton />;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={orders || []} columns={columns} />
    </div>
  );
};

export default OrderList;