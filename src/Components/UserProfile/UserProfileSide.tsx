import React, { useEffect} from 'react';
import UserStyle from "./UserStyle.module.css";
import {NavLink} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { getUser } from '../../Redux/Slices/UserSlice';
import UserBio from './UserBio';
import UserFav from './UserFav';
import { FaHeart ,FaUser,FaShoppingCart,FaEdit} from "react-icons/fa";
import { useAppSelector } from '../../Redux/hooks';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import Header from './UserHeader';
import { Button } from '@mui/material';
import EditModal from './EditModal';


function UserProfileSide() {

  const [isInfoOpen, setIsInfoOpen] = React.useState(false);
  const [isFavOpen, setIsFavOpen] = React.useState(false);
  const [isOrderOpen, setIsOrderOpen] = React.useState(true);
  const dispatch = useDispatch<any| object| AsyncThunkConfig>();

  let authUser:any= useAppSelector((state)=> state.auth);
  const id = authUser?.authUser?._id;
  useEffect(() => {
    dispatch(getUser(id)).then((result:any) => {})
  }, [])
  const { user } = useAppSelector(state => state.user);


  return (
    <>
      <Header UserData={user} />
      <div className="container" >
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
        <div className={UserStyle.row}>
          <div className="row">
            {/* Profile Side Started*/}
            <div className={`col-md-3 ${UserStyle.profileNav} `}>
              <div>
                <div className={`${UserStyle.profile_heading} rounded-1`}>
                  <h2 className={`text-center`}>{`${user?.fname} ${user?.lname}`}</h2>
                  <h4 className={`text-center`}>{user?.email}</h4>
                </div>
              </div>

              <ul className={`${UserStyle.nav_list}`} >
                <li className={UserStyle.nav_item}>
                  <Button variant="contained" className={UserStyle.iconn} color="success" onClick={() => {
                    setIsInfoOpen(!isInfoOpen)
                  }}
                  >
                    <FaUser style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                    <span style={{fontSize:"20px"}}>معلومات</span>
                  </Button>
                </li>
                <li className={`${UserStyle.nav_item}`}>
                  <Button variant="contained" color='success' className={UserStyle.iconn}>
                    <NavLink to="/product" style={{ color: "white" ,fontSize:"18px"}}>
                      <FaShoppingCart style={{marginLeft:"6px"}}/>
                        تسوق الآن
                    </NavLink>
                  </Button>
                </li>
                <li className={`${UserStyle.nav_item}`}>
                  <EditModal UserData={user}/>
                </li>
                <li className={`${UserStyle.nav_item}`}>
                  <Button variant="contained" className={UserStyle.iconn} color="success" onClick={() => {
                    setIsFavOpen(!isFavOpen)
                  }}>
                    <FaHeart  style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                    <span style={{fontSize:"20px"}}>قائمة المفضلة </span>
                  </Button>
                </li>
                <li className={`${UserStyle.nav_item}`}>
                  <Button variant="contained" className={UserStyle.iconn} color="success" onClick={() => {
                    setIsOrderOpen(!isOrderOpen)
                  }}>
                      <FaShoppingCart style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                      <span style={{fontSize:"20px"}}> الطلبات </span>
                    </Button>
                </li>
              </ul>
            </div>

            <div className="col-md-9">
              {isInfoOpen &&(
                <div style={{display: 'block', width: 900, padding: 30}}>
                    <UserBio UserData={user} />
                </div >
              )}
              
              {isFavOpen &&(
                <div style={{display: 'block', padding: 30}}>
                    <UserFav />
                </div >
              )}

              {isOrderOpen &&(
                <div style={{display: 'block', padding: 30}}>
                    {/* <UserOrder UserData={userr} /> */}
                </div >
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileSide;