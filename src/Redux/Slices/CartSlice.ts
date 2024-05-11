import { createSlice} from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IProduct } from "../../types/iProduct";

interface cartState {
    cartItems: Array<IProduct>,
    numItemsInCart:number,
    cartTotal:number,
    shipping: number,
    tax: number,
    orderTotal: number,
}

const storedCart = localStorage.getItem('cart');
let initialState: cartState;

if (storedCart) {
    initialState = JSON.parse(storedCart);
} else {
    initialState = {
        cartItems:[],
        numItemsInCart:0,
        cartTotal:0,
        shipping:500,
        tax:0,
        orderTotal:0,
    };
}

const cartSlice = createSlice({
    name:"cart",
    initialState ,

    reducers:{
        addItem: (state, action) => {
            const product = action.payload;
            console.log(product)
            const itemId:string= product._id;
            const item:any = state.cartItems.find((item) => item._id === itemId);
    
            if (item) {
                item.amount += product?.amount;
            } else {
                state.cartItems.push(product);
            }

            state.numItemsInCart += product?.amount;
            state.cartTotal += product?.price * product?.amount;
            cartSlice.caseReducers.calculateTotals(state);
            toast.success(`🦄 تـم اضـافـه ${product.name} في الـسـله بنـجاح `);
        },
        removeItem: (state, action) => {
            const product = action.payload;
            state.cartItems = state.cartItems.filter((item:IProduct) => item._id !== product._id);
            state.numItemsInCart -= product?.amount;
            state.cartTotal -= product?.price * product?.amount;
            cartSlice.caseReducers.calculateTotals(state);
            toast.error(`🦄 تـم ازالة ${product.name} من الـسـله `);
        },
        increase: (state, action) => {
            const _id = action.payload;
            const item:any= state.cartItems.find((item:IProduct) => item._id === _id);
            item.amount += 1;
            state.numItemsInCart += item.amount;
            state.cartTotal += item.price ;
            cartSlice.caseReducers.calculateTotals(state);
        },
        decrease: (state, action) => {
            const _id = action.payload;
            const item:any= state.cartItems.find((item:IProduct) => item._id === _id);
            if(item.amount >1){
                item.amount -= 1;
                state.numItemsInCart -= item.amount;
                state.cartTotal -= item.price ;
                cartSlice.caseReducers.calculateTotals(state);
            }
        },
        clearCart: (state) => {
            localStorage.removeItem('cart');
        },
        calculateTotals: (state) => {
            state.tax = 0.1 * state.cartTotal;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;
            localStorage.setItem('cart', JSON.stringify(state));
        },

    },
    
    
});

export const { addItem,clearCart,increase,decrease ,removeItem} = cartSlice.actions;

export default cartSlice.reducer;