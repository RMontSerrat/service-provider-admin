'use client';

import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Alert, Box, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useProducts } from './useProducts';
import ProductsListSkeleton from './ProductsListSkeleton';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ProductsList = () => {
  const router = useRouter();
  const { products, archiveProduct, isLoading, error } = useProducts();
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleOpenDialog = (id: string) => {
    setSelectedProductId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedProductId(null);
  };

  const handleConfirmArchive = () => {
    if (selectedProductId) {
      archiveProduct(selectedProductId, {
        onSuccess: () => {
          toast.success('Item arquivado com sucesso');
          handleCloseDialog();
        },
        onError: (error) => {
          toast.error(error?.message || 'Failed to archive product');
          handleCloseDialog();
        },
      });
    }
  };

  const handleEditProduct = (id: string) => {
    router.push(`/products/${id}`);
  };

  const handleCloneProduct = (id: string) => {
    router.push(`/products/new?clone=${id}`);
  };

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
      width: 250,
      type: 'number',
      sortable: false,
      filterable: false,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="flex-start" width="100%">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(params.value)}
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: '',
      align: 'right',
      headerAlign: 'right',
      width: 250,
      renderCell: (params) => (
        <Box display="flex" justifyContent="flex-end" width="100%" gap="10px">
          <Tooltip title="Editar">
            <IconButton color="primary" aria-label="edit product" onClick={() => handleEditProduct(params.row.id.toString())}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clonar">
            <IconButton color="secondary" aria-label="clone product" onClick={() => handleCloneProduct(params.row.id.toString())}>
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Arquivar">
            <IconButton color="error" aria-label="archive product" onClick={() => handleOpenDialog(params.row.id.toString())}>
              <ArchiveIcon />
            </IconButton>
          </Tooltip>
        </Box>
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
      <DataGrid 
        rows={products || []} 
        columns={columns} 
        disableRowSelectionOnClick
        hideFooterSelectedRowCount // Esconde a contagem de linhas selecionadas no rodapé
        disableColumnMenu // Desativa o menu de colunas
        disableColumnSelector // Desativa o seletor de colunas
        sx={{
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-row': {
            pointerEvents: 'none', // Desativa a interatividade com as linhas
          },
          '& .MuiDataGrid-cell': {
            pointerEvents: 'auto', // Permite interatividade apenas nos ícones e botões
          },
        }}
      />

      {/* Dialog de confirmação */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-archive-title"
        aria-describedby="confirm-archive-description"
      >
        <DialogTitle id="confirm-archive-title">Confirmar Arquivamento</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-archive-description">
            Você tem certeza que deseja arquivar este produto? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmArchive} color="error" variant="contained" autoFocus>
            Arquivar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsList;