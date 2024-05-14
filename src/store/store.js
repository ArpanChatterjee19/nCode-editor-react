import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';
import codeSlice from './codeSlice';
import styleSlice from './styleSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        code : codeSlice,
        style : styleSlice,
    }
})

export default store