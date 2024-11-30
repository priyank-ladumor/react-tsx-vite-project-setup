import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import { MuiOtpInput } from 'mui-one-time-password-input';
import FormHelperText from '@mui/material/FormHelperText';
import { FormControl, FormLabel } from '@mui/material';

interface RHFCodeOTPProps {
  name: string;
  label: string;
  other?: Record<string, unknown>;
}

export default function RHFCodeOTP({ name, label, other }: RHFCodeOTPProps) {
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <FormLabel>{label}</FormLabel>  {/* Display the label */}
          <MuiOtpInput
            {...field}
            autoFocus
            gap={1.5}
            length={6}
            TextFieldsProps={{
              error: !!error,
              placeholder: '-',
            }}
            {...other}
          />
          {error && (
            <FormHelperText sx={{ px: 2 }} error>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
