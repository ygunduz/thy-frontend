import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

export const routesApi = createApi({
    baseQuery: baseQuery,
    reducerPath: 'routesApi',
    endpoints: (builder) => ({
        getRoutes: builder.query({
            query: (params) => ({
                url: '/routes',
                params,
            })
        }),
    }),
});

export const {
    useLazyGetRoutesQuery
} = routesApi;