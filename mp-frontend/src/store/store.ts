import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./service/service/auth.service.ts";
import sessionReducer from './slice/session.slice.ts'
import {setupListeners} from "@reduxjs/toolkit/query";
import {middleware401} from './middleware/middleware401.ts'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer, // <--- Y aquí
        sessionSlice: sessionReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware) // <--- Y aquí
            .concat(middleware401)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);