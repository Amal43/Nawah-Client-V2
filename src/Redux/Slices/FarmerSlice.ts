import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

interface farmerState {
    farmer:object |any
}

const url=`${process.env.REACT_APP_BASE_URL}/farmer`;
const id:any=localStorage.getItem('userId');
const parsedId =JSON.parse(id);
console.log(parsedId)

const token:any=localStorage.getItem('token');
const parsedToken =JSON.parse(token);

export const getFarmer= createAsyncThunk(
    'farmer/getFarmer',
    async(id:string)=>{
        try{
            const res= await axios.get(`${url}/${id}`,);
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

export const editProfile= createAsyncThunk(
    'farmer/editProfile',
    async(form:FormData,{ rejectWithValue ,dispatch})=>{
        try{
            const res= await axios.put(`${url}/${parsedId}`,
                form,
                {
                    headers: {
                        authorization: `Bearer ${parsedToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            dispatch(getFarmer(parsedId))
            return res.data
        }catch (err:any){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            return rejectWithValue(errorMessage);
        } 
    }
);

export const addNotes= createAsyncThunk(
    'farmer/addNote',
    async(data:object,{ rejectWithValue })=>{
        try{
            const res= await axios.put(`${url}/addNote`,
                data,
                {
                    headers: {
                        authorization: `Bearer ${parsedToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return res.data
        }catch (err:any){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            return rejectWithValue(errorMessage);
        } 
    }
);



const farmerSlice = createSlice({
    name:"farmer",
    initialState:{
        farmer: {}
    }as farmerState,

    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFarmer.pending, (state, action) => {
                state.farmer = action.payload;
                console.log("pending");
            })
            .addCase(getFarmer.fulfilled, (state, action) => {
                state.farmer = action.payload.data;
                console.log("fulfilled");
            })
            .addCase(getFarmer.rejected, (state, action) => {
                state.farmer = action.payload;
                console.log("rejected");
            })  
    
            .addCase(editProfile.pending, (state, action) => {
                state.farmer = action.payload;
                console.log("pending");
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.farmer = action.payload.data;
                console.log("fulfilled");
                toast.success(' تم تعديل بياناتك بنجاح');
                dispatch(getFarmer(parsedId));
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.farmer = action.payload;
                console.log("rejected");
            })  
            
            .addCase(addNotes.pending, (state, action) => {
                state.farmer = action.payload;
                console.log("pending");
            })
            .addCase(addNotes.fulfilled, (state, action) => {
                state.farmer = action.payload.data;
                console.log("fulfilled");
                toast.success(' تم اضافة ملاحظة بنجاح');
            })
            .addCase(addNotes.rejected, (state, action) => {
                state.farmer = action.payload;
                console.log("rejected");
            }) 
    },
});


export default farmerSlice.reducer;

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
