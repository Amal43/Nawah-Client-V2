import { NavLink } from "react-router-dom";
import tableCartStyles from "./Tablecart.module.css";
import TableCartRow from "./TableCartRow";
import empty from '../../Assets/images/emptycart.jpg'
import { useAppSelector } from "../../Redux/hooks";
import { IProduct } from "../../interfaces/iProduct";
import { useEffect } from "react";

function Tablecart() {
  const cart  = useAppSelector((state) => state.cart);
console.log(cart)
  useEffect(() => {
    if (cart.cartItems.length === 0) {
      console.log('Cart is empty');
    }
  }, [cart]);
  return (
    <div className={tableCartStyles.wrapper}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column">
          <div className={tableCartStyles.h3}>عربة التسوق</div>
        </div>
        <div className={`ml-auto ${tableCartStyles.btn}`}>
          <span className="fas fa_cog" />
        </div>
        <NavLink className={tableCartStyles.btn} id={tableCartStyles.sub} to="/product">
          اذهب للتسوق
        </NavLink>
      </div>
        {!cart.cartItems?.length && ( 
          <div className={tableCartStyles.emptty}>
              <img src={empty} alt="emptycart" />
              <h4> عربة التسوق فارغة</h4>
          </div>
          )}
        {cart.cartItems.length !== 0 &&(
            <>
              <div className={`${tableCartStyles.notification} ${tableCartStyles.alert} ${tableCartStyles.alert_dismissible} ${tableCartStyles.fade} ${tableCartStyles.show} text-white d-flex align-items-center my-3 text-justify`}
                role="alert"
              >
                <span className="far fa-bell pr-2" />
                لديك {cart?.cartItems?.length} منتجات في عربة التسوق الخاصة بك تحقق من ذلك!
              </div>

              <div
                id={tableCartStyles.table}
                className={`bg-white ${tableCartStyles.rounded}`}
              >
                <div className="d-md-flex align-items-md-center px-3 pt-3">
                  <div className="d-flex flex-column">
                    <div className={`${tableCartStyles.h4} font-weight-bold`}>
                      قائمة المنتجات
                    </div>
                  </div>
                </div>
                <div className={tableCartStyles.table_responsive}>
                  <table
                    className={`${tableCartStyles.table} ${tableCartStyles.activitites}`}
                  >
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className={`${tableCartStyles.text_uppercase} ${tableCartStyles.header}`}
                        >
                          صـورة المنتج
                        </th>
                        <th
                          scope="col"
                          className={`${tableCartStyles.text_uppercase} ${tableCartStyles.header}`}
                        >
                          اسم المنتج
                        </th>
                        <th scope="col" className={tableCartStyles.text_uppercase}>
                          نـوع الـمـنـتـج
                        </th>
                        <th scope="col" className={tableCartStyles.text_uppercase}>
                          السعر
                        </th>
                        <th scope="col" className={tableCartStyles.text_uppercase}>
                          +
                        </th>
                        <th scope="col" className={tableCartStyles.text_uppercase}>
                          الكمية
                        </th>
                        <th scope="col" className={tableCartStyles.text_uppercase}>
                          -
                        </th>
                        <th scope="col" className={tableCartStyles.text_uppercase}>
                          السعر الكلي
                        </th>

                        <th scope="col" className={tableCartStyles.text_uppercase}>
                          حذف
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cart.cartItems?.map((item:IProduct) => {
                          return <TableCartRow data={item} key={item._id} />
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-end align-items-end">
                  <div className={`d-flex px-3 pr-md-5 py-1 ${tableCartStyles.subtotal}`} >
                    <div className="px-4">المجموع الكلى</div>
                    <div className={`${tableCartStyles.h5} font-weight-bold px-md-2`}>
                        {cart.cartTotal}
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkbtncon">
                <NavLink className={tableCartStyles.checkbtn} to="/checkout">
                  طلب
                </NavLink>
              </div>
            </>
          )}
    </div>
  );
}

export default Tablecart;
