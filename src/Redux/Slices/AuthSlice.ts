import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

interface AuthState {
    isAuthenticated: boolean;
    authUser: any;
}

const url=  process.env.REACT_APP_BASE_URL;

export const registerUser= createAsyncThunk(
    'auth/registerUser',
    async(form:object)=>{
        console.log(form)
        try{
            const res= await axios.post(`${url}/auth/register`,form);
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

export const loginUser= createAsyncThunk(
    'auth/loginUser',
    async(values:object)=>{
        console.log(values)
        try{
            const res= await axios.post(`${url}/auth/login`,values);
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

const authSlice = createSlice({
    name:"authUser",
    initialState:{
        isAuthenticated: false,
        authUser: {}
    }as AuthState,
    reducers:{
        logoutUser: (state) => {
            state.authUser = {};
            state.isAuthenticated=false;
            toast.success('تم تسجيل الخروج بنجاح');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.authUser = action.payload;
                console.log("pending");
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.authUser = action.payload;
                toast.success('تم انشاء حساب بنجاح');
                console.log("fulfilled");
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.authUser = action.payload;
                console.log("rejected");
            })
            .addCase(loginUser.pending, (state, action) => {
                state.authUser = action.payload;
                console.log("pending");
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authUser = action.payload.data;
                state.isAuthenticated=true;
                const userId = action.payload.data._id;
                const token = action.payload.token;
                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('userId', JSON.stringify(userId));
                toast.success(' تم تسجيل الدخول بنجاح');
                console.log("fulfilled");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.authUser = action.payload;
                console.log("rejected");
            });
    },
});


export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;