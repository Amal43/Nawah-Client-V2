import React, { useEffect, useState } from 'react'
import FarmerStyle from "../FarmerProfile/FarmerStyle.module.css";
import EngineerStyles from './Engineer.module.css';
import EngineerBio from './EngineerBio';
import { useDispatch,} from 'react-redux';
import { Button } from '@mui/material';
import { FaList  ,FaUser} from "react-icons/fa";
import { useAppSelector } from '../../Redux/hooks';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { getEngineer } from '../../Redux/Slices/EngineerSlice';
import Header from './EngineerHeader';
import EngineerFarmer from './EngineerFarmer';


function EngineerProfileSide() {

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<any| object| AsyncThunkConfig>();

  let authUser:any= useAppSelector((state)=> state.auth);
  const id = authUser?.authUser?._id;

  useEffect(() => {
    dispatch(getEngineer(id)).then((result:any) => {})
  }, [])
  const { engineer } = useAppSelector(state => state.engineer);

  return (
    <>
      <Header data={engineer} />
      <div className="container">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="row">
          {/* Profile Side Started*/}
          <div className={`col-md-3 ${FarmerStyle.profileNav}`}>
            <div>
              <div className={`${FarmerStyle.profile_heading} rounded-1`}>
                <h2 className={`text-center`}>{engineer?.fname} {engineer?.lname}</h2>
                <h4 className={`text-center`}>{engineer?.email}</h4>
              </div>
            </div>

            <ul className={`${EngineerStyles.nav_list}`}>
              <li className={EngineerStyles.nav_item}>
                  <Button variant="contained" className={EngineerStyles.iconn} color="success" onClick={() => {
                        setIsInfoOpen(!isInfoOpen)
                      }}
                  >
                        <FaUser style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                        <span style={{fontSize:"20px"}}>معلومات</span>
                  </Button>
              </li>
              <li className={EngineerStyles.nav_item}>
                  <Button variant="contained" className={EngineerStyles.iconn} color="success" onClick={() => {
                      setIsOpen(!isOpen)
                      }}
                  >  
                      <FaList style={{fontSize:"18px" ,marginLeft:"6px"}}/>
                      <span style={{fontSize:"20px"}}>  قائمة المزارعين </span>
                  </Button>
              </li>
            </ul>
          </div>

          {/* Bio Graph Started */}
          <div className="col-md-9">
              {isInfoOpen &&(
                <div style={{display: 'block', width: 900, padding: 30}}>
                    <EngineerBio data={engineer} />
                </div >
              )}


              {isOpen &&(
                <div style={{display: 'block', width: 900, padding: 30}}>
                    <EngineerFarmer  data={engineer}/>
                </div >
              )}

          </div>
        </div>
      </div>
    </>  
  )
}

export default EngineerProfileSide;