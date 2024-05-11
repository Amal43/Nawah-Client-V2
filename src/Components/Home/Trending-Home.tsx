import { useEffect, useState } from "react";
import logo from "../../Assets/images/ae82ddcb42f1cfb920a3e739a61aeb4f-removebg-preview.png";
import Trend from "./Trending.module.css";
import { getallproducts } from '../../Redux/Slices/ProductSlice';
import { useDispatch } from "react-redux";
import Rating from "@mui/material/Rating";
import { IProduct } from "../../types/iProduct";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";


function TrendingHome() {
  const [arr, setArr] = useState<Array<IProduct>>([]);
  const dispatch = useDispatch()<any| object| AsyncThunkConfig>;

  // useEffect(() => {
  //   setArr(toprate);
  // }, [toprate]);

  useEffect(() => {
    dispatch(getallproducts())
      .then((result:any) => {
        setArr([...result.payload]);
        console.log('inhome', arr);
      })
      .catch((err:any) => {
        console.error('Error fetching data:', err);
      });
  }, []);


  return (
    <section className={Trend.Trending}>
      <div className={Trend.container}>
        <div className={Trend.trend__header}>
          <img src={logo} alt="" />
          <h3> اخترنا لك</h3>
        </div>
        <div id="TTPTab-0" className={Trend.tab_box_heading}>
          <ul className={`${Trend.nav} ${Trend.nav_tabs}`}>
            <li className={Trend.active}>
              <a href="#tab-featured-0" data-toggle="tab">
                الأكثر تقييمًا
              </a>
            </li>
          </ul>
        </div>

        <div className={Trend.row}>
          <div className={Trend.cards}>
            {
              arr && arr.map((item:IProduct, index:number) => {
                return (
                  <>
                    <div className={Trend.item}>
                      <div className={Trend['item__img']}>
                        <img src={`http://localhost:3500/${item?.imageUrl}`}alt="" />
                      </div>
                      <div className={`${Trend.item_dec} ${"mt-2"}`}>
                        <div className={Trend['item_dec_text']}>
                          <h4>اسـم الـمنـتج : {item.name}</h4>
                        </div>
                        <div className={Trend['item_dec_text']}>
                          <h4> {item.category} : نوع المنتج</h4>
                        </div>
                        <div className={Trend['item_dec_price']}>
                          <p>{item.price} : الـسـعر </p>
                        </div>
                        <div className={Trend['button-group']}>
                          <Rating name="read-only" value={item.rates} readOnly
                            style={{ direction: "ltr" , display:"block"}}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  );
}


export default TrendingHome;
