import { useEffect ,useState} from 'react'
import CheckoutStyle from'./Checkout.module.css';
import { FaIdCard } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useStripe,useElements, CardElement} from '@stripe/react-stripe-js';
import  Slider  from './Slider';
import { createOrder, getClientSecret } from '../../Redux/Slices/OrderSlice';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { StripeElements } from '@stripe/stripe-js';
import { IProduct } from '../../interfaces/iProduct';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const cart  = useAppSelector((state) => state.cart);
    let authUser:any= useAppSelector((state)=> state.auth);
    const dispatch = useAppDispatch()<any| object| AsyncThunkConfig>;
    const stripe = useStripe();
    const navigate = useNavigate();
    const[cartItems ,setCartItems] = useState()
    const elements:StripeElements | null= useElements();
    useEffect(()=>{
        setCartItems(cart.cartItems.map((item:IProduct) => {
            return {
                productId: item._id,
                name: item.name,
                price: item.price*(item.amount ??0),
                amount: item.amount ?? 0, 
            };
        }));
    },[cart])
    // YUB Validation
    let checkOutSchema = Yup.object().shape({
        name: Yup.string(),
        addresse: Yup.string(),
        phoneNumber: Yup.number(),
    });

    // Values Intialization
    let formik = useFormik({
        initialValues:{
            name:"",
            address:"",
            phoneNumber:0,
        },
        validationSchema:checkOutSchema,

    // On Submit 
        onSubmit: async(values) =>{
            const egyptianPhoneNumberRegex = /^(?:\+20|0)?1[0-9]{9}$/;
            if (!egyptianPhoneNumberRegex.test(values.phoneNumber.toString())) {
                toast.error('رقم الهاتف غير صحيح');
                return;  
            }

            const cardElement = elements?.getElement("card");
            if (!stripe|| !elements || !cardElement) {
                // Stripe.js has not loaded yet, wait for it to load.
                return;
            }
            
            try {
                const paymentMethod:any = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                    billing_details: {
                        name: values.name,
                        email: authUser?.authUser?.email,
                        phone: `${values.phoneNumber}`,
                        address: {
                            line1: values.address,
                        },
                    },
                })
                if (paymentMethod) {
                    const data = {
                        paymentMethod,
                        total: cart.orderTotal,
                    };
                    await dispatch(getClientSecret(data)).then(async (result:any)=>{
                        const clientSecret = result.payload.payment_intent_client_secret;
                        const paymentIntentId = result.payload.paymentIntent_id;
                        // const paymentIntent: any = await stripe.confirmCardPayment(`${clientSecret}`, 
                        //     paymentMethod
                        // );
                        const orderdata = {
                            items:cartItems,
                            shippingFee: cart.shipping,
                            tax: cart.tax,
                            paymentIntentId: paymentIntentId,
                            clientSecret: clientSecret,
                            status: 'paid',
                        };
                        const resultAction = await dispatch(createOrder(orderdata));
                        if (createOrder.fulfilled.match(resultAction)) {
                            navigate('/success', { replace: true });
                        }
                    });
                }
                
            } catch (error) {
                console.log(error)
            }
        }
    });


    return (
        <div className={`${CheckoutStyle.modal} ${CheckoutStyle.clearfix}`}>
            <div className={CheckoutStyle.modal_product}>
                <div className={CheckoutStyle.product}>
                    <div className={CheckoutStyle.product_slideshow} >
                        <div>
                            <Slider/>
                        </div>
                    </div>
                    <p className={CheckoutStyle.product_price}>
                        السعر الكلى :{cart.orderTotal}
                    </p>
                </div>
                <div className={CheckoutStyle.round_shape}/>
            </div>
            <div className={CheckoutStyle.modal_info}>
                <div className={CheckoutStyle.info}>
                    <h2>معلومات الدفع</h2>
                        <form action="#" onSubmit={formik.handleSubmit}>
                            <div className={`col-12 ${CheckoutStyle.checkoutInput}`}>
                                <input
                                    placeholder='الاسم كامل'
                                    id='name'
                                    name='name'
                                    type='text'
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={`col-12 ${CheckoutStyle.checkoutInput}`}>
                                <input
                                    placeholder='العنوان'
                                    id='address'
                                    name='address'
                                    type='text'
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div  className={`col-12 ${CheckoutStyle.checkoutInput}`}>
                                <input
                                    placeholder='رقم الهاتف'
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    type='number'
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={`col-12 ${CheckoutStyle.checkoutInput}`}>
                                    <CardElement
                                        options={{
                                            hidePostalCode: true,
                                            style: {
                                                base: {
                                                    fontSize: "20px",
                                                    color: "#464a64",
                                                    "::placeholder": {
                                                    color: "#7b7e81",
                                                    },
                                                },
                                                invalid: {
                                                    color: "#dc3a6a",
                                                },
                                            },
                                        }}
                                    />
                            </div>
                            <input type="submit"  value="ادفع الآن " className={CheckoutStyle.btn}/>
                        
                        </form>
                </div>
            </div>
        </div>
    );
}

export default Checkout;