import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

export const transportationsApi = createApi({
    baseQuery: baseQuery,
    reducerPath: 'transportationsApi',
    endpoints: (builder) => ({
        getTransportations: builder.query({
            query: (params) => ({
                url: '/transportations',
                params,
            }),
        }),
        createTransportation: builder.mutation({
            query: (transportation) => ({
                url: '/transportations',
                method: 'POST',
                body: transportation,
            }),
        }),
        updateTransportation: builder.mutation({
            query: ({ id, ...transportation }) => ({
                url: `/transportations/${id}`,
                method: 'PUT',
                body: transportation,
            }),
        }),
        deleteTransportation: builder.mutation({
            query: (id) => ({
                url: `/transportations/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetTransportationsQuery,
    useCreateTransportationMutation,
    useUpdateTransportationMutation,
    useDeleteTransportationMutation,
} = transportationsApi;