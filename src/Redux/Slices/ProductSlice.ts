import { AsyncThunkAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../../interfaces/iProduct";
import { toast } from 'react-toastify';
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";


interface PrdState {
    products:Array<IProduct>|any,
    details:{},
    farmerprds:[],
    farmproduct:{},
    toprate:[],
    fertilizer:[],
    dates:[],
    palm:[]
}


const url=`${process.env.REACT_APP_BASE_URL}/product`;

const id:any=localStorage.getItem('userId');
const parsedId =JSON.parse(id);
console.log(parsedId)

const token:any=localStorage.getItem('token');
const parsedToken =JSON.parse(token);

export const getallproducts= createAsyncThunk(
    'product/getallproducts',
    async()=>{
        try{
            const res= await axios.get(`${url}/`,);
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
    async(form:FormData,{ rejectWithValue ,dispatch})=>{
        try{
            const res= await axios.post(`${url}/`,
                form,
                {
                    headers: {
                        authorization: `Bearer ${parsedToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            dispatch(getallproducts());
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
    async(data:{form:FormData,id?:string},{ rejectWithValue,dispatch })=>{
        try{
            const res= await axios.put(`${url}/${data.id}`,
                data.form,
                {
                    headers: {
                        authorization: `Bearer ${parsedToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            dispatch(getallproducts());
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
    async(id:string,{ rejectWithValue ,dispatch})=>{
        console.log(id)
        try{
            const res= await axios.delete(`${url}/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${parsedToken}`,
                    },
                }
            );
            dispatch(getallproducts());
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
        fertilizer:[],
        palm:[],
        dates:[]
    }as PrdState,
    
    reducers:{
        farmerPrds: (state) => {
            state.farmerprds = state?.products?.data?.filter((item:IProduct) => item?.farmerId === parsedId);
        },
        fertilizers: (state) => {
            state.fertilizer = state?.products?.data?.filter((item:IProduct) => item?.category === "fertilizer");
        },
        dates: (state) => {
            state.dates = state?.products?.data?.filter((item:IProduct) => item?.category === "dates");
        },
        palm: (state) => {
            state.palm = state?.products?.data?.filter((item:IProduct) => item?.category === "palm");
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getallproducts.pending, (state, action) => {
                state.products = action.payload;
                console.log("pending");
            })
            .addCase(getallproducts.fulfilled, (state, action) => {
                state.products = action.payload.data;
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


export const { farmerPrds ,fertilizers,dates,palm} = productSlice.actions;


export default productSlice.reducer;

function dispatch(arg0: AsyncThunkAction<any, void, AsyncThunkConfig>) {
    throw new Error("Function not implemented.");
}
