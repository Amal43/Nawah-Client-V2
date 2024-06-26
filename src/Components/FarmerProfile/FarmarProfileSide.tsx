import React, { useEffect, useState } from 'react'
import FarmerStyle from "./FarmerStyle.module.css";
import { Link, NavLink, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import FarmarBio from './FarmerBio';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import Header from './FarmHeader';
import FarmerProduct from './FarmerProduct';
import FarmerFav from './FarmerFav';
import FarmerOrder from './FarmerOrder';
import Notifications from './Notifications';
import { Button } from '@mui/material';
import { FaHeart ,FaUser,FaShoppingCart ,FaBell } from "react-icons/fa";
import { getFarmer } from '../../Redux/Slices/FarmerSlice';
import { useAppSelector } from '../../Redux/hooks';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { IoChatbubblesSharp } from "react-icons/io5";
import FarmerBio from './FarmerBio';
import EditModal from './EditModal';
import AddProductModal from './AddProductModal';



function FarmarProfileSide() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(true);
  const [isNotifiyOpen ,setIsNotifiyOpen] = useState(false);

  const dispatch = useDispatch<any| object| AsyncThunkConfig>();

  let authUser:any= useAppSelector((state)=> state.auth);
  const id = authUser?.authUser?._id;
  useEffect(() => {
    dispatch(getFarmer(id)).then((result:any) => {})
  }, [])
  const { farmer } = useAppSelector(state => state.farmer);

  return (
    <>
      <Header Data={farmer} />
      <div className="container">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />

        <div className="row">

          {/* Profile Side Started*/}
          <div className={`col-lg-3 col-md-12 ${FarmerStyle.profileNav}`}>
            <div>
              <div className={`${FarmerStyle.profile_heading} rounded-1`}>
                <h2 className={`text-center`}>{`${farmer?.fname} ${farmer?.lname}`}</h2>
                <h4 className={`text-center`}>{farmer?.email}</h4>
              </div>
            </div>

            <ul className={`${FarmerStyle.nav_list}`}>
              <li className={`${FarmerStyle.nav_item}`}>
                <Button variant="contained" className={FarmerStyle.iconn} color="success" onClick={() => {
                  setIsInfoOpen(!isInfoOpen)
                  }}
                >
                    <FaUser style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                    <span style={{fontSize:"20px"}}>معلومات</span>
                </Button>
              </li>

              <li className={`${FarmerStyle.nav_item}`}>
                  <EditModal Data ={farmer}/>
              </li>

              <li className={`${FarmerStyle.nav_item}`}>
                  <AddProductModal Data ={farmer}/>
              </li>

              <li className={`${FarmerStyle.nav_item}`}>
                <Button variant="contained" className={FarmerStyle.iconn} color="success" onClick={() => {
                    setIsFavOpen(!isFavOpen)
                  }}
                >
                    <FaHeart  style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                    <span style={{fontSize:"20px"}}>قائمة المفضلة </span>
                </Button>
              </li>
              <li className={`${FarmerStyle.nav_item}`}>
                <Button variant="contained" className={FarmerStyle.iconn} color="success" onClick={() => {
                    setIsOrderOpen(!isOrderOpen)
                  }}
                >
                  <FaShoppingCart style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                  <span style={{fontSize:"20px"}}> الطلبات </span>
                </Button>
              </li>
              <li className={`${FarmerStyle.nav_item}`}>
                <Button variant="contained" className={FarmerStyle.iconn} color="success" onClick={() => {
                    setIsNotifiyOpen(!isNotifiyOpen)
                  }}
                >
                  <FaBell style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                  <span style={{fontSize:"20px"}}>  الاشـعارات </span>
                </Button>
              </li>
              <li className={`${FarmerStyle.nav_item}`}>
                <>
                  <Button variant="contained" className={FarmerStyle.iconn} color="success" onClick={() => {
                
                  }}>
                    <IoChatbubblesSharp style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                    <span style={{fontSize:"20px"}}> المحادثة </span>
                  </Button>
                </>
              </li>
            </ul>
          </div>
          <div className="col-lg-9 col-md-12">
              {isInfoOpen &&(
                <div style={{display: 'block', width: 900, padding: 30}}>
                    <FarmerBio Data={farmer} />
                </div >
              )}
              
              {isFavOpen &&(
                <div style={{display: 'block', padding: 30}}>
                    <FarmerFav />
                </div >
              )}

              {isOrderOpen &&(
                <div style={{display: 'block', padding: 30}}>
                    {/* <UserOrder UserData={userr} /> */}
                </div >
              )}

              {isNotifiyOpen &&(
                <div style={{display: 'block', padding: 30}}>
                    <Notifications data={farmer}/>
                </div >
              )}


              <div>
                  <h4>المنتجات المضافة :</h4>
                  <hr style={{ color: "white", width: "70%" }} />
                  <FarmerProduct id={farmer?._id}/>
              </div>
            </div>
        </div>

      </div>
    </>
  )
}

export default FarmarProfileSide