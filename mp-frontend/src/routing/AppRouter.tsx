import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthPage} from "../page/auth-page/AuthPage.tsx";


export const AppRouter = () => {
    const isLoggedIn = false;
    return (
        <BrowserRouter >
            <Routes>
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <AuthPage/>}
                />

                <Route
                    path="/dashboard"
                    element={isLoggedIn ? <>home</> : <Navigate to="/login" replace />}
                />

                <Route
                    path="*"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};