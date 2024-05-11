import React, { useState ,useEffect} from 'react';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import { useFormik } from 'formik';
import FarmerStyle from "./FarmerStyle.module.css";
import * as Yup from 'yup';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { useDispatch } from 'react-redux';
import { editProduct ,getallproducts} from '../../Redux/Slices/ProductSlice';
import { IProduct } from '../../types/iProduct';

export default function EditProductModal(item:any) {
    const product:IProduct = item?.data
    const [open, setOpen] = useState(false);
    const[isEdit ,SetIsEdit] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()<any| object| AsyncThunkConfig>;

    const one = /^\d+$/;
    let schema = Yup.object().shape({
        name: Yup.string(),
        quantity: Yup.string().matches(one, { message: "يجب أن يكون رقم" }),
        category: Yup.string(),
        price: Yup.number(),
        description: Yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            quantity: "",
            category: "",
            price: "",
            description: "",
            imageUrl: null,
        },

        validationSchema: schema,
        onSubmit: async (values) => {
            console.log(values);

            let form:FormData = new FormData();
            form.append("name", values.name);
            form.append("quantity", values.quantity);
            form.append("category", values.category);
            form.append("price", values.price);
            form.append("description", values.description);
            if (values.imageUrl !== null) {
                form.append("imageUrl", values.imageUrl);
            }

            try {
                await dispatch(editProduct({form , id:product?._id}));
                SetIsEdit(true)
            } catch (error) {
                console.log(error);
            }
        },
    })

    useEffect(() => {
        if(isEdit){
            dispatch(getallproducts());
            SetIsEdit(false);
        }
    }, [isEdit]);

    return (
        <div>
            <button  style={{ marginLeft: 10}} className={FarmerStyle.prdbtn}
                onClick={handleOpen}
            >
                    <span style={{fontSize:"20px",color: "rgb(95, 91, 91)" }}> تعديل</span>
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: StyledBackdrop }}
            >
                <Fade in={open}>
                    <ModalContent sx={style}>
                        <form  lang="ar" onSubmit={formik.handleSubmit}>
                            <div className='row'>
                                <div  className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={product?.name}
                                        id='name'
                                        name='name'
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={`${product?.quantity}`}
                                        id='quantity'
                                        name='quantity'
                                        type ="number"
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={product?.category}
                                        id='category'
                                        name='category'
                                        type='text'
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className={`col-6 ${FarmerStyle.single_input}`}>
                                    <input
                                        placeholder={`${product?.price}`}
                                        id='price'
                                        name='price'
                                        type='number'
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                
                            </div>
                            
                            <div className={`col-12 ${FarmerStyle.single_input}`}>
                                <input
                                    placeholder={product?.description}
                                    id='description'
                                    name='description'
                                    type='text'
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={`col-12 ${FarmerStyle.single_input}`}>
                                <input
                                    placeholder="صورة المنتج"
                                    name='imageUrl'
                                    id='imageUrl'
                                    type='file'
                                    onChange={(e:any) => { formik.setFieldValue('imageUrl', e.currentTarget.files[0]) }}
                                />
                            </div>
                            
                            <div>
                                <button type="submit" className={`${'btn btn-block'} ${FarmerStyle.formbtn}`} onClick={handleClose}>
                                    تعديل المنتج
                                </button>
                            </div>
                        </form>
                    </ModalContent>
                </Fade>
            </Modal>
        </div>
    )
}

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean }>(
    (props, ref) => {
        const { open, ...other } = props;
        return (
        <Fade in={open}>
            <div ref={ref} {...other} />
        </Fade>
        );
    },
);



const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
};

const ModalContent = styled('div')(
    ({ theme }) => css`
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border-radius: 8px;
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
        padding: 24px;
        color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

        & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
        }

        & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
        }
    `,
);
