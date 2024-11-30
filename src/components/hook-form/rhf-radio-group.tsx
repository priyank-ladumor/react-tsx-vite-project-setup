import { Controller, useFormContext } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { FC } from 'react';

interface RHFRadioGroupOption {
    label: string;
    value: string | number | boolean;
}

interface RHFRadioGroupProps {
    name: string;
    label?: string;
    options: RHFRadioGroupOption[];
    row?: boolean;
    spacing?: number | string;
    helperText?: React.ReactNode;
    [key: string]: unknown;
}

const RHFRadioGroup: FC<RHFRadioGroupProps> = ({
    row = false,
    name,
    label,
    options,
    spacing = 0,
    helperText,
    ...other
}) => {
    const { control } = useFormContext();

    const labelledby = label ? `${name}-${label}` : '';

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl component="fieldset" error={!!error}>
                    {label && (
                        <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2' }}>
                            {label}
                        </FormLabel>
                    )}
                    <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.value as string}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                                sx={{
                                    '&:not(:last-of-type)': {
                                        mb: row ? 0 : spacing,
                                    },
                                    ...(row && {
                                        mr: spacing,
                                    }),
                                }}
                            />
                        ))}
                    </RadioGroup>
                    {(error || helperText) && (
                        <FormHelperText sx={{ mx: 0 }}>
                            {error?.message || helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

export default RHFRadioGroup;
