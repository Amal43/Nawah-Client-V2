import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


interface engineerState {
    engineer:object |any
}

const url=`${process.env.REACT_APP_BASE_URL}/engineer`;

const id:any=localStorage.getItem('userId');
const parsedId =JSON.parse(id);
console.log(parsedId)

const token:any=localStorage.getItem('token');
const parsedToken =JSON.parse(token);

export const getEngineer= createAsyncThunk(
    'engineer/getEngineer',
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


const engineerSlice = createSlice({
    name:"engineer",
    initialState:{
        engineer: {}
    }as engineerState,

    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEngineer.pending, (state, action) => {
                state.engineer = action.payload;
                console.log("pending");
            })
            .addCase(getEngineer.fulfilled, (state, action) => {
                state.engineer = action.payload.data;
                console.log("fulfilled");
            })
            .addCase(getEngineer.rejected, (state, action) => {
                state.engineer = action.payload;
                console.log("rejected");
            })   
    },
});


export default engineerSlice.reducer;