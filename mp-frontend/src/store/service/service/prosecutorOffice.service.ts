import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getHeader} from "../../../_util/functions.ts";
import type {FiscalResponse, ProsecutionOfficeResponse} from "../model/prosecutorOffice.model.ts";


export const prosecutorOfficeApi = createApi({
    reducerPath: 'prosecutorOfficeApiApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: `${import.meta.env.VITE_API_URL}`,
            prepareHeaders: (headers, {getState}) => {
                return getHeader(headers, getState)
            }
        }),
    endpoints: (builder) => ({
        listProsecutorOffice: builder.query<ProsecutionOfficeResponse, void>({
            query: () => `/prosecution-offices`,
        }),
        listFiscal: builder.mutation<FiscalResponse, string>({
            query: (data) => `/prosecution/office/${data}`,
        }),
    }),
});

export const {useListFiscalMutation, useListProsecutorOfficeQuery} = prosecutorOfficeApi;