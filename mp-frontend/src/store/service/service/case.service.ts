import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getHeader} from "../../../_util/functions.ts";
import type { CaseInfoListResponse} from "../model/case.model.ts";

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
    }),
});

export const {
    useListCasesQuery,
} = caseApi;