import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getHeader} from "../../../_util/functions.ts";
import type {
    CaseInfoListResponse,
    CreateCaseRequest,
    GetCasesCountByStateForUserResponse,
    UpdateCaseRequest
} from "../model/case.model.ts";

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
        listCases: builder.query<CaseInfoListResponse, void>({
            query: () => `/case/info`,
            providesTags: ['list']
        }),
        createCase: builder.mutation<void, CreateCaseRequest>({
            query: (data) => ({
                url: `case`,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled }) {
                const result = await queryFulfilled.catch((e) => ({ error: e }));
                if ('error' in result) {
                    return;
                }
            },
            invalidatesTags: ['list']
        }),
        updateCase: builder.mutation<string, UpdateCaseRequest>({
            query: (data) => ({
                url: `case/${data.id_caso}`,
                method: 'PUT',
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled }) {
                const result = await queryFulfilled.catch((e) => ({ error: e }));
                if ('error' in result) {
                    return;
                }
            },
            invalidatesTags: ['list']
        }),
        getCasesByUser: builder.query<GetCasesCountByStateForUserResponse, string>({
            query: (data) => `case/list/${data}`,
        }),
    }),

});

export const {
    useListCasesQuery,
    useCreateCaseMutation,
    useUpdateCaseMutation,
    useGetCasesByUserQuery
} = caseApi;