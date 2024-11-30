import { lazy, Suspense } from 'react';
import Loading from 'src/components/loader/loader';

const Home = lazy(() => import("src/pages/Home/home.jsx"));
const NotFound = lazy(() => import("src/pages/NotFound/not-found.jsx"));
const Login = lazy(() => import("src/pages/login/login.jsx"));
const Form = lazy(() => import("src/pages/form/form.jsx"));

const routes = [
    {
        path: '/', element: (
            <Suspense fallback={<Loading />} >
                <Home />
            </Suspense>
        ), protected: false,
    },
    {
        path: '/login', element: (
            <Suspense fallback={<Loading />} >
                <Login />
            </Suspense>
        ), protected: true,
    },
    {
        path: '/form', element: (
            <Suspense fallback={<Loading />} >
                <Form />
            </Suspense>
        ), protected: false,
    },
    { path: '*', element: <NotFound />, protected: false },
];

export default routes;
