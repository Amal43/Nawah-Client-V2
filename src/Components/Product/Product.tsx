import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Product.module.css';
import icon from "../../Assets/images/ae82ddcb42f1cfb920a3e739a61aeb4f-removebg-preview.png";
import { useDispatch } from 'react-redux';
import { getallproducts } from '../../Redux/Slices/ProductSlice';
import Productcard from './Productcard';
import { NavLink} from 'react-router-dom';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { IProduct } from '../../interfaces/iProduct';
import { useAppSelector } from '../../Redux/hooks';
import { FaCartShopping } from "react-icons/fa6";


function Product() {

    const dispatch = useDispatch()<any| object| AsyncThunkConfig>;
    const { products } = useAppSelector((state) => state.product);
    let [arr, setarr] = useState<Array<IProduct>>([]);
    let [active, setactive] = useState(false);
    let [active2, setactive2] = useState(false);
    let [active3, setactive3] = useState(false);
    let [origin, setorigin] = useState([]);
    

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const authUser:any= useAppSelector((state)=>state.auth);
    useEffect(() => {
        dispatch(getallproducts()).then((result:any) => {
            setarr([...result.payload.data]);
        }).catch((err:any) => {
        });
        setorigin(products);
    }, []);
    useEffect(()=>{
        authUser.isAuthenticated? setIsLoggedIn(true):setIsLoggedIn(false);
    },[authUser]);

    return (
        <section className={styles.Product}>
            <div className={styles.container}>
                <div className={styles['prod__header']}>
                    <img src={icon} alt="" />
                    <h2>المنتجات</h2>
                </div>
                <div className={styles['prod__butt']}>
                    <button className={active ? styles.color : styles.active} >
                        بلح
                    </button>
                    <button className={active2 ? styles.color : styles.active}>
                        نخيل
                    </button>
                    <button className={active3 ? styles.color : styles.active}>
                        سمـاد
                    </button>
                </div>
                <div className={styles.row}>
                    <div className={styles.items}>
                        {
                            arr.map((item:IProduct) => {
                                return <Productcard product={item} key={item._id} />
                            })
                        }
                    </div>
                </div>
                {isLoggedIn && <button className={`${['btn-cart']} ${styles.button}`}
                    type="button" title="أضف إلى عربة التسوق" >
                    <NavLink className={`${styles.btnicon}`} to="/cart">
                        <FaCartShopping style={{fontSize: "32px"}}/>
                    </NavLink>
                </button>
                }
            </div>
        </section>
    )
}

export default Product;