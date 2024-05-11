import React, { useEffect, useState } from "react";
import navStyle from "./navbarStyle.module.css";
import logo from "../../Assets/images/palm-leaf-products.jpg";
import { NavLink,useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector} from 'react-redux';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { logoutUser } from "../../Redux/Slices/AuthSlice";
import { RootState } from "../../Redux/Store";


function Nav() {
  let nav = useNavigate();
  const [isLogged, setIsLogged] = useState<Boolean>(false);
  const dispatch = useDispatch()<any| object| AsyncThunkConfig>;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout=()=> {
    localStorage.clear();
    nav('/home')
    dispatch(logoutUser());
    setIsLogged(false)
  }
  let authUser:any= useSelector((state:RootState)=> state.auth);
  console.log(authUser)
  useEffect(()=>{
    authUser.isAuthenticated? setIsLogged(true):setIsLogged(false);
  },[authUser])
  

  return (
    <nav className={`navbar navbar-expand-lg  ${navStyle.nav}`}>
      <div
        className={`container-fluid text-dark  rounded-3 ${navStyle.container}`}
      >
        <NavLink className="navbar-brand" to="/home">
            <img
              src={logo}
              alt="logo"
              className="img-fluid ms-2 "
              style={{ width: "50px", height: "100%" }}
            />
            <h3 className={`${navStyle.logo}`} >نـواة</h3>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav text-sm-center mx-auto mb-2 mb-lg-0">
            <li className={`nav-item px-1 ${navStyle.list}`}>
              <NavLink className={`${"nav-link active"}`} aria-current="page" to="/home" >  الصفحة الرئيسية  </NavLink>
            </li>
            <li className={`nav-item px-1 ${navStyle.list}`}>
              <NavLink className={`${"nav-link "}`} aria-current="page" to="/product">    منتجاتنا  </NavLink>
            </li>
            <li className={`nav-item px-1 ${navStyle.list}`}>
              <NavLink className={`${"nav-link "}`} aria-current="page" to="/aboutus">      من نحن </NavLink>
            </li>
            <li className={`nav-item px-1 ${navStyle.list}`}>
              <NavLink className={`${"nav-link "}`} aria-current="page" to="/contact">    تواصل معنا </NavLink>
            </li>
          </ul>


          {!isLogged &&(<NavLink className={`${"btn btn-secondary"} ${navStyle.navbtn}`} to="/">
            أنشئ حساب
          </NavLink>)}

          {isLogged&&(<React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="medium"
                  sx={{ ml: 4}}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 48, height: 48 }}>{authUser?.authUser?.fname}</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              sx={{ ml: 2}}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar sx={{ ml: 2}}/> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar sx={{ ml: 2}}/> 
                {authUser?.authUser?.role === 'user' &&(
                  <NavLink className={`${"nav-link "}`} aria-current="page" to="/userProfile">My account</NavLink>
                )}

                {authUser?.authUser?.role === 'engineer' &&(
                  <NavLink className={`${"nav-link "}`} aria-current="page" to="/engineerProfile">My account</NavLink>
                )}

                {authUser?.authUser?.role === 'farmer' &&(
                  <NavLink className={`${"nav-link "}`} aria-current="page" to="/farmerProfile">My account</NavLink>
                )}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAddIcon fontSize="medium" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="medium" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem  onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="medium" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>)}

  
        </div> 
      </div>
    </nav>
  );
}

export default Nav;
