import { alpha, createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar, { formats } from 'src/components/editor/toolbar.tsx';
import ReactQuill from 'react-quill';
import React from 'react';

interface EditorProps {
    id?: string;
    error?: boolean;
    simple?: boolean;
    helperText?: React.ReactNode;
    sx?: object;
    [key: string]: unknown;
}

const theme = createTheme({
    palette: {
        error: {
            main: '#d32f2f',
        },
    },
});

const StyledEditor = styled('div')<{ error: boolean }>(({ theme, error }) => ({
    border: error ? `solid 1px ${theme.palette.error.main}` : 'none',
    '& .ql-editor': {
        backgroundColor: error ? alpha(theme.palette.error.main, 0.08) : 'transparent',
    },
}));

const Editor: React.FC<EditorProps> = ({
    id = 'minimal-quill',
    error = false,
    simple = false,
    helperText = null,
    sx,
    ...other
}) => {
    const modules = {
        toolbar: {
            container: `#${id}`,
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
        },
        clipboard: {
            matchVisual: false,
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledEditor error={error} sx={{ ...sx }}>
                <Toolbar id={id} simple={simple} />
                <ReactQuill
                    modules={modules}
                    formats={formats}
                    placeholder="Write something awesome..."
                    {...other}
                />
            </StyledEditor>
            {helperText && <div>{helperText}</div>}
        </ThemeProvider>
    );
};

export default Editor;
