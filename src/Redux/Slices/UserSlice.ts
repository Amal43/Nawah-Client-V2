import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


interface userState {
    user:object |any
}

const url='http://localhost:3001';
const id:any=localStorage.getItem('userId');
const parsedId =JSON.parse(id);
console.log(parsedId)

const token:any=localStorage.getItem('token');
const parsedToken =JSON.parse(token);

export const getUser= createAsyncThunk(
    'user/getUser',
    async(id:string)=>{
        try{
            const res= await axios.get(`${url}/user/${id}`,);
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
    'user/editProfile',
    async(form:FormData,{ rejectWithValue })=>{
        try{
            const res= await axios.put(`${url}/user/update/${parsedId}`,
                form,
                {
                    headers: {
                        authorization: `Bearer ${parsedToken}`,
                        'Content-Type': 'multipart/form-data',
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



const userSlice = createSlice({
    name:"user",
    initialState:{
        user: {}
    }as userState,

    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.user = action.payload;
                console.log("pending");
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload.data;
                console.log("fulfilled");
            })
            .addCase(getUser.rejected, (state, action) => {
                state.user = action.payload;
                console.log("rejected");
            })   
            .addCase(editProfile.pending, (state, action) => {
                state.user = action.payload;
                console.log("pending");
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.user = action.payload.data;
                console.log("fulfilled");
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.user = action.payload;
                console.log("rejected");
            })   
    },
});


export default userSlice.reducer;