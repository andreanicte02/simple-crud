import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getHeader} from "../../../_util/functions.ts";
import type {CaseInfoListResponse, CreateCaseRequest} from "../model/case.model.ts";
import {setCaseModal} from "../../slice/caseInfo.slice.ts";

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
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled.catch((e) => ({ error: e }));
                if ('error' in result) {
                    return;
                }
                dispatch(setCaseModal('none'));
            },
            invalidatesTags: ['list']
        }),
    }),

});

export const {
    useListCasesQuery,
    useCreateCaseMutation
} = caseApi;