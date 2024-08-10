import React, { useState } from 'react';
import { Drawer, Box, TextField, Button, Typography, Grid, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/app/schemas';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import { Product } from './useProducts';

interface ProductFormDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialProductData?: Product;
}

const ProductFormDrawer: React.FC<ProductFormDrawerProps> = ({ open, onClose, onSubmit, initialProductData }) => {
  const [selectedImage, setSelectedImage] = useState<string | File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialProductData || {
      name: '',
      price: 0,
      description: '',
      image: '',
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles[0]);
    setValue('image', acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const predefinedGiftCards = [
    'https://via.placeholder.com/150x100.png?text=Gift+Card+1',
    'https://via.placeholder.com/150x100.png?text=Gift+Card+2',
    'https://via.placeholder.com/150x100.png?text=Gift+Card+3',
  ];

  const handleSelectGiftCard = (url: string) => {
    setSelectedImage(url);
    setValue('image', url);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: '80vw', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header fixo */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3">{initialProductData ? 'Editar Gift Card' : 'Adicionar Gift Card'}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Conteúdo rolável */}
        <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              {...register('nome')}
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />
            <TextField
              label="Preço"
              fullWidth
              margin="normal"
              type="number"
              {...register('price', { valueAsNumber: true })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              label="Descrição"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              {...register('description')}
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium">Escolha um Gift Card ou faça o upload:</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {predefinedGiftCards.map((url, index) => (
                  <Grid item xs={3} key={index}>
                    <Box
                      component="img"
                      src={url}
                      sx={{
                        width: '100%',
                        border: selectedImage === url ? '2px solid blue' : '2px solid transparent',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleSelectGiftCard(url)}
                    />
                  </Grid>
                ))}
                <Grid item xs={3}>
                  <Box
                    {...getRootProps()}
                    sx={{
                      width: '100%',
                      height: '175px',
                      border: selectedImage && typeof selectedImage === 'object' ? '2px solid blue' : '2px dashed gray',
                      borderRadius: '4px',
                      padding: '8px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <input {...getInputProps()} />
                    {selectedImage && typeof selectedImage === 'object' ? (
                      <Typography>{(selectedImage as File).name}</Typography>
                    ) : (
                      <Typography>ou arraste e solte ou clique para adicionar seu próprio gift card</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>

        {/* Footer fixo */}
        <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {initialProductData ? 'Salvar Alterações' : 'Adicionar Gift Card'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ProductFormDrawer;