import { useDispatch} from 'react-redux';
import styles from './UserStyle.module.css';
import { useAppSelector } from '../../Redux/hooks';
import { IProduct } from '../../types/iProduct';
import { FaCartShopping , FaXmark } from "react-icons/fa6";
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { addItem} from '../../Redux/Slices/CartSlice';
import {removeFavItem } from '../../Redux/Slices/WishSlice';
import Table from '@mui/material/Table';
import emptywishes from '../../Assets/images/emptywishlist.jpg'
import UserStyle from "./UserStyle.module.css";

function UserFav() {
    const dispatch = useDispatch<any| object| AsyncThunkConfig>();
    const wish  = useAppSelector((state) => state.wish);
    const api ="http://localhost:3001/uploads/";
    
    return (
        <>
            <h4>
                المفضلة
                <i className="fa-solid fa-heart fa-bounce" style={{ color: " #ff0000", marginRight: "15px" }}></i>
            </h4>
            {!wish.wishItems?.length && ( 
                <div className={UserStyle.emptywishes}>
                    <img src={emptywishes} alt="emptywishlist" />
                    <h4> قائمة المفضلة فارغة 💔</h4>
                </div>
            )}
            {wish.wishItems?.length !== 0 &&(
                <>
                    <Table sx={{ minWidth: 850 }} aria-label="simple table" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>صـورة الـمـنـتـج</th>
                                <th>أسـم الـمـنـتـج</th>
                                <th>نـوع الـمـنـتـج</th>
                                <th>سـعـر الـمـنـتـج</th>
                                <th>حالة الـمـنـتـج</th>
                                <th> أضف الـي الـسله</th>
                                <th> حذف الـمنـتج</th>
                            </tr>
                        </thead>
                        {
                            wish.wishItems&& wish.wishItems.map((item:IProduct, index:number) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <td>{++index}</td>
                                            <td className={styles.aa}>
                                                <img src={`${api}${item.imageUrl}`} alt="productImage" className={styles.roundedCircle} />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.price}</td>
                                            <td>{item.status}</td>
                                            {/* <td>{item.rate}</td> */}
                                            <td>
                                                <button className={styles['btn_cart']} type="button" title=" أضف إلى عربة التسوق"
                                                    onClick={() =>
                                                            dispatch(addItem({...item,amount:1}))
                                                    }
                                                >
                                                    <FaCartShopping/>
                                                </button>
                                            </td>
                                            <td>
                                                <button className={styles['btn_cart']} 
                                                    onClick={() => { 
                                                        dispatch(removeFavItem(item)) 
                                                    }}
                                                >
                                                    <FaXmark/>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                    </Table>
                </>
            )}    
        </>
    )
}

export default UserFav;