import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/authSlice.ts'
import { authApi } from '@/services/authApi'
import { locationsApi } from '@/services/locationsApi'
import { transportationsApi } from '@/services/transportationsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [transportationsApi.reducerPath]: transportationsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(locationsApi.middleware)
      .concat(transportationsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 