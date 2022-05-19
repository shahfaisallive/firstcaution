import { configureStore } from '@reduxjs/toolkit'
import formReducers from './formSlice'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = configureStore({
    reducer: {
        formData: formReducers,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(composeWithDevTools),
})