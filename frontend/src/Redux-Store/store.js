
import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from '../slices/apiSlice'
 import cartSliceReducer from '../slices/cartSlice'
 import loginSliceReducer from '../slices/loginSlice'

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
         cart:cartSliceReducer,
         login:loginSliceReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    // devTools:process.env.NODE_ENV !== 'production'?true:false,
    devTools:true,
})

export default store