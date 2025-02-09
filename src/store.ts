import {configureStore} from '@reduxjs/toolkit'
import authReducer from '@/features/authSlice.ts'
import {authApi} from '@/services/authApi'
import {locationsApi} from '@/services/locationsApi'
import {transportationsApi} from '@/services/transportationsApi'
import {routesApi} from '@/services/routesApi'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [locationsApi.reducerPath]: locationsApi.reducer,
        [transportationsApi.reducerPath]: transportationsApi.reducer,
        [routesApi.reducerPath]: routesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(locationsApi.middleware)
            .concat(transportationsApi.middleware)
            .concat(routesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 