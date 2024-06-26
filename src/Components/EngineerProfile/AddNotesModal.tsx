import React, { useState ,useEffect} from 'react';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import { FaClipboard ,FaPlus} from "react-icons/fa";
import { useFormik } from 'formik';
import styles from './Engineer.module.css';
import * as Yup from 'yup';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../Redux/hooks';
import { IProduct } from '../../interfaces/iProduct';
import { fertilizers } from '../../Redux/Slices/ProductSlice';
import Table from '@mui/material/Table';
import { addNotes } from '../../Redux/Slices/FarmerSlice';
 


export default function AddNotesModal(item:any) {
    const farmerId:string = item.id._id;
    const [open, setOpen] = useState(false);
    const [showInput , setShowInput] = useState(false)
    const [selectedPrd , setSelectedPrd] = useState("")

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {fertilizer} = useAppSelector((state) => state.product);
    useEffect(() => {
        dispatch(fertilizers())
    }, []);
    const dispatch = useDispatch()<any| object| AsyncThunkConfig>;
    
    const handleClick = (id:string) => {
        setShowInput(true);
        setSelectedPrd(id);
    };

    let schema = Yup.object().shape({
        note: Yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            note: "",
        },

        validationSchema: schema,
        onSubmit: async (values) => {
            const data={
                note:values.note,
                farmerId:farmerId,
                productId:selectedPrd,
            }
            if(values.note !== ""){
                dispatch(addNotes(data))
                setSelectedPrd("")
            }
        },
    })

    return (
        <>
            <button  className={styles.butt} 
                onClick={handleOpen}
            >
                <span>اسـتشاره زراعـيه</span>
                <FaClipboard  style={{fontSize:"18px", marginRight:"6px"}}/>
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
                        {!showInput &&(<Table sx={{ minWidth: 650 }} aria-label="simple table" >
                            <thead>
                                <tr>
                                    <th>أسـم الـمـنـتـج</th>
                                    <th>وصف الـمـنـتـج</th>
                                    <th>  أضف ملاحظة</th>
                                </tr>
                            </thead>
                            {
                                fertilizer?.map((item:IProduct, index:number) => {
                                    return (
                                        <tbody>
                                            <tr style={{height:"50px"}}>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                                <td>
                                                    <button className={styles.plus} onClick={() => handleClick(item?._id)}>
                                                        <FaPlus/>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            }
                        </Table>
                        )}

                        {showInput &&(
                        <form style={{padding:"12px 0"}} onSubmit={formik.handleSubmit}>
                            <label>
                                <textarea 
                                    placeholder='أضف ملاحظة.....' 
                                    name="note" 
                                    rows={5} 
                                    cols={30} 
                                    onChange={formik.handleChange}
                                    style={{border:"none",outline:"none" ,fontSize:"20px"}}
                                />
                            </label>
                            <div className={``} style={{width:"250px" , margin:" 0 auto" ,display:"flex" ,justifyContent:"space-between" , fontSize:"20px"}}>
                                <button type='submit' className={styles.butt} onClick={handleClose} >
                                    ارسال
                                </button>
                                <button  className={styles.butt}  onClick={()=>{setShowInput(false)}}>
                                    الرجوع   
                                </button>
                            </div>
                        </form>
                        )}
                    </ModalContent>
                </Fade>
            </Modal>
        </>
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
    width: 650,
    padding: 0,
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
