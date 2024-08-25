import React from 'react';
import { Box, Typography, Grid as GridBase } from '@mui/material';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form: React.FC<FormProps> & {
  Content: React.FC<ContentProps>;
  Title: React.FC<TitleProps>;
  Description: React.FC<DescriptionProps>;
  Grid: React.FC<ContentProps>;
} = ({ children, ...props }) => {
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '800px' }} {...props}>
      {children}
    </Box>
  );
};

interface ContentProps {
  children: React.ReactNode;
  xs?: number;
}

const Content: React.FC<ContentProps> = ({ xs, children }) => {
  return (
    <GridBase item xs={xs}>
      {children}
    </GridBase>
  );
};

interface ContentProps {
  children: React.ReactNode;
}

const Grid: React.FC<ContentProps> = ({ children }) => {
  return <GridBase container spacing={2}>{children}</GridBase>;
};

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
      {children}
    </Typography>
  );
};

interface DescriptionProps {
  children: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({ children }) => {
  return (
    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
      {children}
    </Typography>
  );
};

Form.Content = Content;
Form.Title = Title;
Form.Description = Description;
Form.Grid = Grid;

export default Form;