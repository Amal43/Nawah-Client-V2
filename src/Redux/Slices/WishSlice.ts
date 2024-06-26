import { createSlice} from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IProduct } from "../../interfaces/iProduct";

interface wishState {
    wishItems: Array<IProduct>,
    numItemsInWish:number,
}

const storedwish = localStorage.getItem('wish');
let initialState: wishState;

if (storedwish) {
    initialState = JSON.parse(storedwish);
} else {
    initialState = {
        wishItems: [],
        numItemsInWish: 0,
    };
}

const wishSlice = createSlice({
    name:"wish",
    initialState ,

    reducers:{
        addFavItem: (state, action) => {
            const product = action.payload;
            const itemId:string= product._id;
            const item = state.wishItems.find((item) => item._id === itemId);
    
            if (item) {
                item.amount += product.amount;
            } else {
                state.wishItems.push(product);
            }

            state.numItemsInWish += product.amount;
            localStorage.setItem('wish', JSON.stringify(state));
            toast.success(`❤️  تـم اضـافـه ${product.name} في المفضلة بنـجاح `);
        },
        removeFavItem: (state, action) => {
            const product = action.payload;
            console.log(product)
            state.wishItems = state.wishItems.filter((item:IProduct) => item._id !== product._id);
            state.numItemsInWish -= product.amount;
            localStorage.setItem('wish', JSON.stringify(state));
            toast.error(`💔 تـم ازالة ${product.name} من المفضلة `);
        },
        clearWish: (state) => {
            localStorage.removeFavItem('wish');
        },
    },
});

export const { addFavItem, removeFavItem} = wishSlice.actions;

export default wishSlice.reducer;