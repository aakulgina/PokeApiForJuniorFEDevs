import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorPage } from "src/pages/ErrorPage/";
import { MainPage } from "src/pages/MainPage";
import { PokePage } from "src/pages/PokePage";
import { RootLayout } from "src/pages/RootLayout";
import { links } from "src/shared/utils/global";
import { ErrorWidget } from "src/widgets/Error";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: links.list(':number'),
                element: <MainPage />
            },
            {
                path: links.list(),
                element: <MainPage />
            },
            {
                path: links.card(':name'),
                element: <PokePage />
            },
            {
                path: links.failure(':code'),
                element: <ErrorPage />,
            },
        ],
        errorElement: <ErrorWidget />
    },
    {
        path: links.base,
        element: (
            <Navigate to={links.list()} replace />
        ),
        errorElement: <ErrorWidget />
    },
]);
