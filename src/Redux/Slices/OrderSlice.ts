import { AsyncThunkAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { clearCart } from "./CartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface orderState {
    order:object |any
}
const url=`${process.env.REACT_APP_BASE_URL}/stripe`;
const urlOrder =`${process.env.REACT_APP_BASE_URL}/order`;
const token:any=localStorage.getItem('token');
const parsedToken =JSON.parse(token);

export const getClientSecret= createAsyncThunk(
    'order/getClientSecret',
    async(data:Object)=>{
        try{
            const res= await axios.post(`${url}/`,data);
            console.log(res.data)
            return res.data
        }catch (err:any){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);

export const createOrder= createAsyncThunk(
    'order/createOrder',
    async(orderdata:Object,{ rejectWithValue,dispatch })=>{
        try{
            const res= await axios.post(`${urlOrder}/`, 
                orderdata,
                {
                    headers: {
                        authorization: `Bearer ${parsedToken}`,
                        'Content-Type': 'application/json',
                    },
                });
            console.log(res.data)
            dispatch(clearCart());
            toast.success(`🦄 تمت عملية الدفع بنجاح `);
            
            return res.data
        }catch (err:any){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            return rejectWithValue(errorMessage);
        } 
    }
);


const orderSlice = createSlice({
    name:"order",
    initialState:{
        order: {}
    }as orderState,

    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClientSecret.pending, (state, action) => {
                state.order = action.payload;
                console.log("pending");
            })
            .addCase(getClientSecret.fulfilled, (state, action) => {
                state.order = action.payload;
                console.log("fulfilled");
            })
            .addCase(getClientSecret.rejected, (state, action) => {
                state.order = action.payload;
                console.log("rejected");
            }).addCase(createOrder.pending, (state, action) => {
                state.order = action.payload;
                console.log("pending");
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                console.log("fulfilled");
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.order = action.payload;
                console.log("rejected");
            })
            
            
    },
});


export default orderSlice.reducer;

function dispatch(arg0: AsyncThunkAction<any, string, AsyncThunkConfig>) {
    throw new Error("Function not implemented.");
}
