import React from 'react';
import InputMask from 'react-input-mask';
import { TextField, TextFieldProps } from '@mui/material';

interface CurrencyInputProps extends Omit<TextFieldProps, 'onChange'> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, ...props }) => {
  const formatCurrency = (val: string) => {
    let value = val.replace(/\D/g, '');

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formatCurrency(event.target.value), 'value ')
    onChange({
      ...event,
      target: {
        ...event.target,
        value: formatCurrency(event.target.value),
      },
    });
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export default CurrencyInput;