import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

export const transportationsApi = createApi({
    baseQuery: baseQuery,
    reducerPath: 'transportationsApi',
    tagTypes: ['Transportations'],
    endpoints: (builder) => ({
        getTransportations: builder.query({
            query: (params) => ({
                url: '/transportations',
                params,
            }),
            providesTags: () => [{ type: 'Transportations', id: 'LIST' }],
        }),
        createTransportation: builder.mutation({
            query: (transportation) => ({
                url: '/transportations',
                method: 'POST',
                body: transportation,
            }),
            invalidatesTags: () => [{ type: 'Transportations', id: 'LIST' }]
        }),
        updateTransportation: builder.mutation({
            query: ({ id, ...transportation }) => ({
                url: `/transportations/${id}`,
                method: 'PUT',
                body: transportation,
            }),
            invalidatesTags: () => [{ type: 'Transportations', id: 'LIST' }]
        }),
        deleteTransportation: builder.mutation({
            query: (id) => ({
                url: `/transportations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Transportations', id: 'LIST' }]
        }),
    }),
});

export const {
    useGetTransportationsQuery,
    useCreateTransportationMutation,
    useUpdateTransportationMutation,
    useDeleteTransportationMutation,
} = transportationsApi;