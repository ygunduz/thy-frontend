import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

export const locationsApi = createApi({
    baseQuery: baseQuery,
    reducerPath: 'locationsApi',
    tagTypes: ['Locations'],
    endpoints: (builder) => ({
        getLocations: builder.query({
            query: (params) => ({
                url: '/locations',
                params,
            }),
            providesTags: () => [{ type: 'Locations', id: 'LIST' }],
        }),
        createLocation: builder.mutation({
            query: (location) => ({
                url: '/locations',
                method: 'POST',
                body: location,
            }),
            invalidatesTags: () => [{ type: 'Locations', id: 'LIST' }]
        }),
        updateLocation: builder.mutation({
            query: ({ id, ...location }) => ({
                url: `/locations/${id}`,
                method: 'PUT',
                body: location,
            }),
            invalidatesTags: () => [{ type: 'Locations', id: 'LIST' }]
        }),
        deleteLocation: builder.mutation({
            query: (id) => ({
                url: `/locations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Locations', id: 'LIST' }]
        }),
    }),
});

export const {
    useGetLocationsQuery,
    useCreateLocationMutation,
    useUpdateLocationMutation,
    useDeleteLocationMutation
} = locationsApi; 