import { Controller, useFormContext } from 'react-hook-form';

import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

interface Props extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: React.ReactNode;
  isControlled?: boolean;
}

export default function RHFSwitch({ name, helperText, isControlled = true, ...other }: Props) {
  const { control } = useFormContext();

  const renderControled = (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel control={<Switch {...field} checked={field.value} />} {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );

  const renderUncontroled = <FormControlLabel control={<Switch />} {...other} />;

  return isControlled ? renderControled : renderUncontroled;
}
