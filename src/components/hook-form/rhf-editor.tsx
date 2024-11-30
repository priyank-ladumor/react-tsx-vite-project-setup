import { useEffect } from 'react';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import FormHelperText from '@mui/material/FormHelperText';
import Editor from 'src/components/editor/editor';

interface RHFEditorProps {
  name: string;
  helperText?: React.ReactNode | null;
  [key: string]: unknown;
}

export default function RHFEditor({ name, helperText = null, ...other }: RHFEditorProps) {
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext<FieldValues>();

  const values = watch();

  useEffect(() => {
    if (values[name] === '<p><br></p>') {
      setValue(name, '', {
        shouldValidate: !isSubmitSuccessful,
      });
    }
  }, [isSubmitSuccessful, name, setValue, values]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          id={name}
          value={field.value}
          onChange={(content) => {
            field.onChange(content);
          }}
          sx={{
            '& .ql-editor': { minHeight: 200 },
            border: !!error || helperText ? 'solid 1px red' : 'solid 1px gray',
          }}
          error={!!error}
          helperText={
            !!error || helperText ? (
              <FormHelperText error={!!error} sx={{ px: 2 }}>
                {error ? error.message : helperText}
              </FormHelperText>
            ) : null
          }
          {...other}
        />
      )}
    />
  );
}
