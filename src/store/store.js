import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';
import codeSlice from './codeSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        code : codeSlice
    }
})

export default store