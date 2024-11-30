import { Controller, useFormContext } from 'react-hook-form';
import { Box, Button, Chip, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface RHFFileUploadProps {
  name: string;
  label?: string;
  accept?: string;
  helperText?: ReactNode;
  [key: string]: unknown;
}

export function RHFFileUpload({
  name,
  label,
  accept,
  helperText,
  ...other
}: RHFFileUploadProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box {...other}>
          {label && <Typography variant="subtitle1">{label}</Typography>}
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              accept={accept}
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
          </Button>
          {field.value && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected File: {field.value.name}
            </Typography>
          )}
          {(!!error || helperText) && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error ? error.message : helperText}
            </Typography>
          )}
        </Box>
      )}
    />
  );
}

interface RHFMultiFileUploadProps {
  name: string;
  label?: string;
  accept?: string;
  helperText?: ReactNode;
  [key: string]: unknown;
}

export function RHFMultiFileUpload({
  name,
  label,
  accept,
  helperText,
  ...other
}: RHFMultiFileUploadProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box {...other}>
          {label && <Typography variant="subtitle1">{label}</Typography>}
          <Button variant="contained" component="label">
            Upload Files
            <input
              type="file"
              hidden
              accept={accept}
              multiple
              onChange={(e) => field.onChange(Array.from(e.target.files || []))}
            />
          </Button>
          {field.value && field.value.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
              {field.value.map((file, index) => (
                <Chip key={index} label={file.name} size="small" />
              ))}
            </Box>
          )}
          {(!!error || helperText) && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error ? error.message : helperText}
            </Typography>
          )}
        </Box>
      )}
    />
  );
}
