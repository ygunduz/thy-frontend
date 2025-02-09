import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store';
import {logout} from "@/features/authSlice.ts";

const createNavigationEventEmitter = () => {
    const listeners = new Set<(path: string) => void>();

    return {
        emit: (path: string) => {
            listeners.forEach(listener => listener(path));
        },
        subscribe: (listener: (path: string) => void) => {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        }
    };
};

export const navigationEventEmitter = createNavigationEventEmitter();

const baseQueryPrivate = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQueryPrivate(args, api, extraOptions);

    if (result.error) {
        const error = result.error as { status: number };
        if (error.status === 403 || error.status === 401) {
            api.dispatch(logout());
            navigationEventEmitter.emit('/login');
        }
    }

    return result;
};