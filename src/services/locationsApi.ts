import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

export const locationsApi = createApi({
    baseQuery: baseQuery,
    reducerPath: 'locationsApi',
    endpoints: (builder) => ({
        getLocations: builder.query({
            query: (params) => ({
                url: '/locations',
                params,
            }),
        }),
        createLocation: builder.mutation({
            query: (location) => ({
                url: '/locations',
                method: 'POST',
                body: location,
            }),
        }),
        updateLocation: builder.mutation({
            query: ({ id, ...location }) => ({
                url: `/locations/${id}`,
                method: 'PUT',
                body: location,
            }),
        }),
        deleteLocation: builder.mutation({
            query: (id) => ({
                url: `/locations/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetLocationsQuery,
    useCreateLocationMutation,
    useUpdateLocationMutation,
    useDeleteLocationMutation
} = locationsApi; 