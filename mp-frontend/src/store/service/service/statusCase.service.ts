import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {CaseStatus} from "../model/caseStatus.model.ts";
import {getHeader} from "../../../_util/functions.ts";

export const caseStatusApi = createApi({
    reducerPath: 'caseStatusApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: `${import.meta.env.VITE_API_URL}`,
            prepareHeaders: (headers, {getState}) => {
                return getHeader(headers, getState)
            }
        }),
    endpoints: (builder) => ({
        getCaseStatus: builder.query<CaseStatus[], void>({
            query: () => '/case-state',
        }),
    }),
});

export const {useGetCaseStatusQuery} = caseStatusApi;