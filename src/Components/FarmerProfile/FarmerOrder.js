import React, { useState } from 'react';
import { Table } from 'reactstrap';
import styles from './FarmerStyle.module.css';


export default function FarmerOrder({ FarmerData }) {
    const api = "http://localhost:3500/";
    let arr = []; //
    // const [arr , setArr] = useState()
    //For filter orders of this user
    FarmerData?.order?.forEach(element => {
        element.items?.forEach(product => {
            console.log(product, "aas");
            arr.push(product)
        })
    });

    return (
        <>
            <h4>
                الطلبات
                <i class="fa-solid fa-shop fa-bounce" style={{ color: " #26d926", marginRight: "15px" }}></i>
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
                        </tr>
                    </thead>
                    {
                        arr && arr.map((item, index) => (
                            // console.log(item),
                            <tbody>
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td className={styles.aa}>
                                        <img src={`${api}${item.imageUrl}`} alt="" className={styles.roundedCircle} />
                                    </td>
                                    <td>{item?.name}</td>
                                    <td>{item?.category}</td>
                                    <td>{item?.price}</td>
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