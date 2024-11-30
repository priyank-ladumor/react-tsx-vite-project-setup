import { UseFormReturn, FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methods: UseFormReturn<any>;
    onSubmit?: (data) => void;
};

export default function FormProvider({ children, onSubmit, methods }: Props) {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    );
}
