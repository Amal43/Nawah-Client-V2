import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Product.module.css';
import icon from "../../Assets/images/ae82ddcb42f1cfb920a3e739a61aeb4f-removebg-preview.png";
import { useDispatch } from 'react-redux';
import { getallproducts } from '../../Redux/Slices/ProductSlice';
import Productcard from './Productcard';
import { NavLink, useNavigate } from 'react-router-dom';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { IProduct } from '../../types/iProduct';
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
    let nav = useNavigate();
    const authUser:any= useAppSelector((state)=>state.auth);
    useEffect(() => {
        dispatch(getallproducts()).then((result:any) => {
            setarr([...result.payload.data]);
        }).catch((err:any) => {
        });
        setorigin(products);
    }, []);
    console.log(arr)
    useEffect(()=>{
        authUser.isAuthenticated? setIsLoggedIn(true):setIsLoggedIn(false);
    },[authUser]);
    function Filterbycatigory(category:any) {
        if (category === "") {
            setarr(products);
        }
        else {
            let newarr = products.filter((item:IProduct) => item.category === category);
            setarr(newarr);
            return newarr;
        }
    }
    return (
        <section className={styles.Product}>
            <div className={styles.container}>
                <div className={styles['prod__header']}>
                    <img src={icon}
                        alt="" />
                    <h2>المنتجات</h2>
                </div>
                <div className={styles['prod__butt']}>
                    <li className={active ? styles.color : styles.active} >
                        <NavLink onClick={() => {
                            Filterbycatigory('dates')
                            if (active) {
                                setactive(false)
                            } else {
                                setactive(true);
                                setactive2(false)
                                setactive3(false)
                            }
                        }}  to={''}> بلح</NavLink>
                    </li>
                    <li className={active2 ? styles.color : styles.active}>
                        <NavLink onClick={() => {
                            Filterbycatigory('palm')
                            if (active2) {
                                setactive2(false)
                            } else {
                                setactive2(true);
                                setactive3(false);
                                setactive(false);
                            }
                        }} to={''}>نخيل</NavLink>
                    </li>
                    <li className={active3 ? styles.color : styles.active}>
                        <NavLink onClick={() => {
                            Filterbycatigory('fertilizer');
                            if (active3) {
                                setactive3(false);
                            } else {
                                setactive3(true);
                                setactive(false);
                                setactive2(false);
                            }
                        } } to={''}> سمـاد</NavLink></li>
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