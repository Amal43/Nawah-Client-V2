import {configureStore ,Store} from '@reduxjs/toolkit';
import authSlice from './Slices/AuthSlice';
import productSlice from './Slices/ProductSlice';
import cartSlice from './Slices/CartSlice';
import WishSlice from './Slices/WishSlice';
import ModalSlice from './Slices/ModalSlice';
import UserSlice from './Slices/UserSlice';
import FarmerSlice from './Slices/FarmerSlice';
import EngineerSlice from './Slices/EngineerSlice';
import OrderSlice from './Slices/OrderSlice';

export const store:Store = configureStore({
        reducer:{
                auth: authSlice,
                product:productSlice,
                cart:cartSlice,
                wish:WishSlice,
                modal:ModalSlice,
                user:UserSlice,
                farmer:FarmerSlice,
                engineer:EngineerSlice,
                order:OrderSlice
        },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;