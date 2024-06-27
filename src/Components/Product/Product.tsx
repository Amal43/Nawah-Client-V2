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
    let [origin, setOrigin] = useState<Array<IProduct>>([]);
    let [activeCategory, setActiveCategory] = useState<string>('');
    

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const authUser:any= useAppSelector((state)=>state.auth);
    useEffect(() => {
        dispatch(getallproducts()).then((result:any) => {
            setarr([...result.payload.data]);
            setOrigin([...result.payload.data])
        });
    }, []);

    useEffect(() => {
        if (activeCategory) {
            const filteredProducts = origin?.filter((item: IProduct) => item.category === activeCategory);
            setarr(filteredProducts);
        } else {
            setarr(products);
        }
    }, [activeCategory,origin]);
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
                    <button onClick={() => setActiveCategory('dates')} className={activeCategory === 'dates' ?  styles.active :styles.color }>
                        بلح
                    </button>
                    <button onClick={() => setActiveCategory('palm')} className={activeCategory === 'palm' ? styles.active : styles.color }>
                        نخيل
                    </button>
                    <button onClick={() => setActiveCategory('fertilizer')} className={activeCategory === 'fertilizer' ? styles.active : styles.color}>
                        سمـاد
                    </button>
                </div>
                <div className={styles.row}>
                    <div className={styles.items}>
                        {
                            arr?.map((item:IProduct) => {
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