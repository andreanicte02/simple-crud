import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthPage} from "../page/auth-page/AuthPage.tsx";
import {useGetSessionHook} from "../_util/hooks/useSessionTokenHook.tsx";
import {Layout} from "../_util/layout/Layout.tsx";
import {CasePage} from "../page/case-page/CasePage.tsx";
import {CaseReportPage} from "../page/case-report-page/CaseReportPage.tsx";

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
                                ? <CasePage/>
                                : <Navigate to="/login" replace/>
                        }
                    />

                    <Route
                        path="/case"
                        element={
                            isLoggedIn
                                ? <CaseReportPage/>
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