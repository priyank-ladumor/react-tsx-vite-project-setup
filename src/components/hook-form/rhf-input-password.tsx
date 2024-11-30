import { useState } from 'react';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import { TextField, IconButton, InputAdornment, TextFieldProps } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

// ----------------------------------------------------------------------

interface RHFPasswordFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  helperText?: React.ReactNode;
}

export default function RHFPasswordField({
  name,
  helperText = null,
  ...other
}: RHFPasswordFieldProps) {
  const { control } = useFormContext<FieldValues>();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={field.value || ''}
          onChange={(event) => field.onChange(event.target.value)}
          error={!!error}
          helperText={error ? error.message : helperText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <Icon icon="tabler:eye-off" /> : <Icon icon="tabler:eye" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...other}
        />
      )}
    />
  );
}
