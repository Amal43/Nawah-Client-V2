import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../../types/iProduct";
import Product from "../../Components/Product/Product";
import { toast } from 'react-toastify';


interface PrdState {
    products:Array<IProduct>|any,
    details:{},
    farmerprds:[],
    farmproduct:{},
    toprate:[],
    fertilizer:[],
}


const url='http://localhost:3001';
const id:any=localStorage.getItem('userId');
const parsedId =JSON.parse(id);
console.log(parsedId)

const token:any=localStorage.getItem('token');
const parsedToken =JSON.parse(token);

export const getallproducts= createAsyncThunk(
    'product/getallproducts',
    async()=>{
        try{
            const res= await axios.get(`${url}/product/allPrds`,);
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

export const AddProduct= createAsyncThunk(
    'product/AddProduct',
    async(form:FormData,{ rejectWithValue })=>{
        try{
            const res= await axios.post(`${url}/product/add`,
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

export const editProduct= createAsyncThunk(
    'product/editProduct',
    async(data:{form:FormData,id?:string},{ rejectWithValue })=>{
        try{
            const res= await axios.put(`${url}/product/${data.id}`,
                data.form,
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

export const deleteProduct= createAsyncThunk(
    'product/deleteProduct',
    async(id:string,{ rejectWithValue })=>{
        console.log(id)
        try{
            const res= await axios.delete(`${url}/product/delete/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${parsedToken}`,
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


const productSlice = createSlice({
    name:"Product",
    initialState:{
        products: [],
        details: {},
        farmerprds: [],
        farmproduct: {},
        toprate: [],
        fertilizer:[]
    }as PrdState,
    
    reducers:{
        showdetails: (state, action) => {
            // let item = state.products.filter((item:IProduct) => item._id === action.payload._id)
            // state.details = item;
            console.log(Product)
        },
        farmerPrds: (state) => {
            state.farmerprds = state?.products?.data?.filter((item:IProduct) => item?.farmerId === parsedId);
        },
        fertilizers: (state) => {
            state.fertilizer = state?.products?.data?.filter((item:IProduct) => item?.category === "fertilizer");
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getallproducts.pending, (state, action) => {
                state.products = action.payload;
                console.log("pending");
            })
            .addCase(getallproducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.farmerprds = state?.products?.data?.filter((item:IProduct) => item?.farmerId === parsedId);

                console.log("fulfilled");
            })
            .addCase(getallproducts.rejected, (state, action) => {
                state.products = action.payload;
                console.log("rejected");
            })

            .addCase(AddProduct.pending, (state, action) => {
                state.products = action.payload;
                console.log("pending");
            })
            .addCase(AddProduct.fulfilled, (state, action) => {
                state.products = action.payload;
                // state.farmerprds = state?.products?.data?.filter((item:IProduct) => item?.farmerId === parsedId);
                console.log("fulfilled");
                toast.success(' تم اضافة المنتج بنجاح');
            })
            .addCase(AddProduct.rejected, (state, action) => {
                state.products = action.payload;
                console.log("rejected");
            })

            .addCase(editProduct.pending, (state, action) => {
                state.products = action.payload;
                console.log("pending");
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.products = action.payload;
                // state.farmerprds = state?.products?.data?.filter((item:IProduct) => item?.farmerId === parsedId);
                console.log("fulfilled");
                toast.success(' تم تعديل المنتج بنجاح');
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.products = action.payload;
                console.log("rejected");
            })

            .addCase(deleteProduct.pending, (state, action) => {
                state.products = action.payload;
                console.log("pending");
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = action.payload;
                console.log("fulfilled");
                toast.success(' تم مسح المنتج بنجاح');

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.products = action.payload;
                console.log("rejected");
            })
            
    },
});


export const { showdetails ,farmerPrds ,fertilizers} = productSlice.actions;


export default productSlice.reducer;