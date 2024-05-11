import React  from 'react';
import { useDispatch} from 'react-redux';
import { Table } from 'reactstrap';
import styles from './UserStyle.module.css';
import Rating from "@mui/material/Rating";
import { addRate } from'../../Redux/Slices/ProductSlice';

export default function UserOrder({UserData}) {
    console.log(UserData,"wwwwwwwwwwwwww");
    // constants
    const [value, setValue] = React.useState(0);
    const [id, setId] = React.useState(0);
    const dispatch = useDispatch();
    const api="http://localhost:3500/";
    let arr=[];

    // filter orders of user
    UserData.order?.forEach(element => {
        element.items?.forEach((product)=>{
            arr.push(product)
        })
    });

    return (
    <> 
        <h4>
                الطلبات
            <i class="fa-solid fa-shop fa-bounce" style={{ color: " #26d926" , marginRight:"15px" }}></i>
            </h4>
                <div>
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>صـورة الـمـنـتـج</th>
                                    <th>أسـم الـمـنـتـج</th>
                                    <th>نـوع الـمـنـتـج</th>
                                    <th>سـعـر الـمـنـتـج</th>
                                    <th>حالة الـمـنـتـج</th>
                                    <th> وصف للـمـنـتـج</th>
                                    <th>تقييم للـمـنـتـج</th>
                                </tr>
                            </thead>
                {
                    arr.map((item, index) =>(
                       <tbody>
                                <tr   key={index}>
                                    <td>{++index}</td>
                                    <td className={styles.aa}>
                                        <img src={`${api}${item.imageUrl}`} alt="" className={styles.roundedCircle} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>{item.status}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <Rating
                                            name="simple-controlled"
                                            value={item.rates}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                                setId(item._id);
                                                console.log(id);
                                                console.log(value,"val");
                                                alert(newValue)
                                             dispatch(addRate({value:newValue,prodId:id}));
                                            }}
                                            style={{direction:"ltr" , margin:"5px"}}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                            )
                        )
                }
                    </Table>
                </div>
    </>
    )
}