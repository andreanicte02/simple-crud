import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthPage} from "../page/auth-page/AuthPage.tsx";
import {useGetSessionHook} from "../_util/hooks/useSessionHook.tsx";
import {Layout} from "../_util/layout/Layout.tsx";

export const AppRouter = () => {
    const isLoggedIn = useGetSessionHook();

    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/login"
                    element={
                        isLoggedIn
                            ? <Navigate to="/dashboard" replace/>
                            : <AuthPage/>
                    }
                />

                <Route element={<Layout/>}>

                    <Route
                        path="/dashboard"
                        element={
                            isLoggedIn
                                ? <>fack</>
                                : <Navigate to="/login" replace/>
                        }
                    />
                </Route>

                {/* Ruta catch-all */}
                <Route
                    path="*"
                    element={
                        isLoggedIn
                            ? <Navigate to="/dashboard" replace/>
                            : <Navigate to="/login" replace/>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};