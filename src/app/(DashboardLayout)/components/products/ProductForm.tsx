'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/app/schemas';
import { useDropzone } from 'react-dropzone';
import Form from '../shared/Form';
import { useRouter } from 'next/navigation';
import { useProducts } from './useProducts';
import toast from 'react-hot-toast';

interface ProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    price: number;
    description: string;
    image: string;
    file: File | null;
  };
}

const formatCurrency = (val: string | number) => {
  if (!val) return 0;
  let value = String(val).replace(/\D/g, '');

  if (!value) return '';
  while (value.length < 3) {
    value = '0' + value;
  }

  value = value.slice(0, -2) + ',' + value.slice(-2);

  value = value.replace(/^0+/, '');
  if (value.startsWith(',')) {
    value = '0' + value;
  }

  return `R$ ${value}`;
};


export default function ProductForm({ initialData }: ProductFormProps) {
  const { addProduct, editProduct } = useProducts();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | File | null>(initialData?.image || initialData?.file || null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: initialData?.id || '',
      name: initialData?.name || '',
      price: initialData?.price ? formatCurrency(initialData?.price) : '',
      description: initialData?.description || '',
      image: initialData?.image || '',
      file: initialData?.file || null,
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedImage(file);
    setValue('file', file); // Set the file value
    setValue('image', ''); // Clear the image URL
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] },
  });

  const predefinedGiftCards = [
    'https://cdn.giftup.app/web-assets/voucher-templates/15075ece-3241-4653-81d2-a11f748ab52c.png',
    'https://cdn.giftup.app/web-assets/voucher-templates/071a8a5b-3bf1-4422-a130-dfd19a5a1a9b.png',
  ];

  const handleSelectGiftCard = (url: string) => {
    setSelectedImage(url);
    setValue('image', url); // Set the image URL
    setValue('file', null); // Clear the file value
  };

  const onSubmit = (data: any) => {

    const formattedData = {
      ...data,
      price: Number(data.price.replace('R$ ', '').replace(',', '.')),
    };

    console.log(formattedData);
    if (initialData) {
      editProduct(formattedData, {
        onSuccess: () => {
          toast.success('Gift Card editado com sucesso!');
          router.push('/products');
        },
        onError: (error) => {
          toast.error('Ocorreu um erro ao editar o Gift Card');
          console.error(error);
        },
      });
    } else {
      addProduct(formattedData, {
        onSuccess: () => {
          toast.success('Gift Card adicionado com sucesso!');
          router.push('/products');
        },
        onError: (error) => {
          toast.error('Ocorreu um erro ao adicionar o Gift Card');
          console.error(error);
        },
      }
      );
    }
  }

  const handleCancel = () => {
    router.push('/products');
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Grid>
        <Form.Content xs={3}>
          <Form.Title>Nome e descrição</Form.Title>
          <Form.Description>Descreva o que você está oferecendo para venda:</Form.Description>
        </Form.Content>

        <Form.Content xs={9}>
          <TextField
            label="Nome"
            fullWidth
            sx={{ mb: 2 }}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Descrição"
            fullWidth
            sx={{ mb: 2 }}
            multiline
            rows={4}
            {...register('description')}
          />
        </Form.Content>
      </Form.Grid>
      <Form.Grid>
        <Form.Content xs={3}>
          <Form.Title>Preço</Form.Title>
          <Form.Description>Defina o preço do seu Gift Card:</Form.Description>
        </Form.Content>
        <Form.Content xs={9}>
          <TextField
            label="Preço"
            fullWidth
            sx={{ mb: 2 }}
            {...register('price')}
            error={!!errors.price}
            helperText={errors.price?.message}
            onChange={(event) => {
              setValue('price', formatCurrency(event.target.value));
            }}
          />
        </Form.Content>
      </Form.Grid>
      <Form.Grid>
        <Form.Content xs={3}>
          <Form.Title>Imagem</Form.Title>
          <Form.Description>Adicione uma imagem para o seu Gift Card:</Form.Description>
        </Form.Content>
        <Form.Content xs={9}>
        <Grid container spacing={2}>
            {predefinedGiftCards.map((url, index) => (
              <Grid item xs={predefinedGiftCards.length + 2} key={index}>
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
            <Grid item xs={predefinedGiftCards.length + 2}>
              <Box
                {...getRootProps()}
                sx={{
                  width: '100%',
                  height: 'calc(100% - 10px)',
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
        </Form.Content>
      </Form.Grid>
      <Box sx={{ mt: 4, display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {isSubmitting ? 'Salvando...' : initialData ? 'Salvar Alterações' : 'Adicionar Gift Card'}
          {/* {initialData ? 'Salvar Alterações' : 'Adicionar Gift Card'} */}
        </Button>
      </Box>
      </Form>
  );
};