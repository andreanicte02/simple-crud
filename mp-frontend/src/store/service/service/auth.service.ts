import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {AuthRequest, AuthResponse} from "../model/auth.model.ts";
import {setSession} from "../../slice/session.slice.ts";
import {keyStorage} from "../../../_util/enums.ts";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/api/`,
    }),
    endpoints: (builder) => ({
        auth: builder.mutation<AuthResponse, AuthRequest>({
            query: (data) => ({
                url: `auth`,
                method: 'POST',
                body: data,
                providesTags: ['Post'],
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled.catch((e) => ({ error: e }));
                if ('error' in result) {
                    return;
                }
                dispatch(setSession(result.data));
                localStorage.setItem(keyStorage, JSON.stringify(result.data));
            }
        }),
    })
});

export const { useAuthMutation } = authApi;