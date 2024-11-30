import { useNavigate } from 'react-router-dom';

interface ErrorResponse {
    response?: {
        status?: number;
    };
}

interface Paths {
    error: {
        [key: string]: string;
    };
}

export const handleException = (
    error: ErrorResponse,
    paths: Paths,
    navigate: ReturnType<typeof useNavigate>
): void => {
    console.error(error);

    if (error.response?.status === 404) {
        navigate(paths.error["404"] as string);
    } else if (error.response?.status === 401) {
        navigate(paths.error["401"] as string);
    } else {
        navigate(paths.error["500"] as string);
    }
};
