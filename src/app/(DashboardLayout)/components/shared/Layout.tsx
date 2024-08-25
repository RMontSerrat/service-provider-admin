'use client';

import React from 'react';
import { Container as BaseContainer, Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { IconChevronLeft } from "@tabler/icons-react";

interface CommonProps {
  children: React.ReactNode;
}

function Layout({ children }: CommonProps) {
  return (
    <Box>
      {children}
    </Box>
  );
};

function Header({ children }: CommonProps) {
  return (
    <Box display="flex" flexDirection="column" gap="10px" sx={{ mb: 4, borderBottom: '1px solid #ccc', paddingBottom: '30px' }}>
      {children}
    </Box>
  );
};

function Title({ children }: CommonProps) {
  return (
    <Typography variant="h4" fontWeight="bold">
      {children}
    </Typography>
  );
};

function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }

  return (
    <Box sx={{ marginLeft: '-7px'}}>
      <Button variant="text" color="secondary" onClick={handleBack} sx={{ padding: '0' }}>
        <IconChevronLeft size={20} />
        Voltar
      </Button>
    </Box>
  );
}

function Container ({ children }: CommonProps) {
  return (
    <Box sx={{ mt: 4 }}>
      {children}
    </Box>
  );
}

Layout.Header = Header;
Layout.Title = Title;
Layout.Container = Container;
Layout.BackButton = BackButton;

export default Layout;