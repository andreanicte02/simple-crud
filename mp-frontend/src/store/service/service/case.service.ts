import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {CaseResponse, CaseRequest} from "../model/case.model.ts";
import {getHeader} from "../../../_util/functions.ts";

export const caseApi = createApi({
    reducerPath: "caseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`,
        prepareHeaders: (headers, {getState}) => {
            return getHeader(headers, getState)
        },

    }),
    tagTypes: ["list"],
    endpoints: (builder) => ({
        listCases: builder.query<CaseResponse[], void>({
            query: () => `/case`,
            providesTags: ['list']
        }),

        createCase: builder.mutation<{ message: string }, CaseRequest>({
            query: (data) => ({
                url: ``,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['list'],
        }),

        updateCase: builder.mutation<{ message: string }, { id: number; data: CaseRequest }>({
            query: ({id, data}) => ({
                url: `${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['list']

        }),
        deleteCase: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['list'],
        }),
    }),
});

export const {
    useListCasesQuery,
    useCreateCaseMutation,
    useUpdateCaseMutation,
    useDeleteCaseMutation,
} = caseApi;