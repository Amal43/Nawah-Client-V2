import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

interface messageState {
    message: any;
};

const url=`${process.env.REACT_APP_BASE_URL}/contactMessg`;
let token=JSON.parse(localStorage.getItem('token') || '{}');

export const addmessage = createAsyncThunk(
    'contactMessg/add',
    async(values:object)=>{
        // console.log(values)
        try{
            const res= await axios.post(`${url}/`,
                values,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success('Message send successfully');
            return res.data
        }catch (err:any){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            toast.error(errorMessage);
            throw err;
        } 
    }
);

const messageSlice = createSlice({
    name:"message",
    initialState:{
        message: {}
    }as messageState,
    reducers:{
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(addmessage.pending, (state, action) => {
                state.message = action.payload;
                console.log("pending");
            })
            .addCase(addmessage.fulfilled, (state, action) => {
                state.message = action.payload;
                toast.success('تم ارسال الرسالة بنجاح');
                console.log("fulfilled");
            })
            .addCase(addmessage.rejected, (state, action) => {
                state.message = action.payload;
                console.log("rejected");
            })
            
    },
});


export default messageSlice.reducer;