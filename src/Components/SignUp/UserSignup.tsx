import  { useState } from 'react';
import signup from './UserSignup.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '../../Redux/Slices/AuthSlice';
import {useAppDispatch} from '../../Redux/hooks'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';


function UserSignup() {

  // Constants
  let nav = useNavigate();
  const dispatch = useAppDispatch()<any| object| AsyncThunkConfig>;

  //State for SignUp if it success 
  const [success,setSuccess] =useState<string | null>(null);

   // YUB Validation
  let schema = Yup.object().shape({
    fname: Yup.string().min(3,"Name must be more than 3 letters").required('This field is required'),
    lname: Yup.string().required('This field is required'),
    email: Yup.string().min(15,"must be more than 15 letters").required('This field is required')
    .email("Plase enter a valid email address"),
    password: Yup.string().min(6,"Password must be at least 6 letters").required('This field is required'),
    role: Yup.string().required('This field is required'),
  });
  
  // Values Intialization
  let formik = useFormik({
    initialValues:{
      fname:"",
      lname:"",
      email:"",
      password:"",
      role: ""
    },
    validationSchema:schema,

  // On Submit 
    onSubmit: async(values) =>{
      let form: object = {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password,
        role: values.role
      };

      try {
        dispatch(registerUser(form));
        nav('/login');
      } catch (error) {
        console.log(error);
      }
    }
  })

  return (
  <div className={`${signup["main-parent"]} ${signup["signup-user"]}`}>
    <div className={`${signup["form-wrap"]} ${signup["signup-wrap"]}`}>
      <form action="" onSubmit={formik.handleSubmit}>
        <h1><span>أنشئ</span> حساب</h1>
        <div className="row justify-content-between">
          <div className="col-6">
            <div className={signup["single-input"]}>
              <label htmlFor="fname">الاسم الأول:</label>
              <input type="text" id="fname" name="fname"
              onChange={formik.handleChange}
              onBlur={()=>
                {
                  formik.setTouched({fname:true})
                }}
                style={{ border: formik.touched.fname &&formik.errors.fname ? 'solid 1px red' : '' }} />
                {formik.touched.fname && <small style={{color: 'red'}}>{formik.errors.fname}</small>}
            </div>
            <div className={signup["single-input"]}>
              <label htmlFor="email">الإيميل:</label>
              <input type="email" id="email" name="email"
              onChange={formik.handleChange}
              onBlur={()=>
                {
                  formik.setTouched({email:true})
                }}
                style={{ border: formik.touched.email &&formik.errors.email ? 'solid 1px red' : '' }} />
              {formik.touched.email && <small style={{color: 'red'}}>{formik.errors.email}</small>}
            </div>
          </div>
          <div className="col-6">
            <div className={signup["single-input"]}>
              <label htmlFor="lname"> الاسم الأخير:</label>
              <input type="text" id="lname" name="lname" 
              onChange={formik.handleChange}
              onBlur={()=>
                {
                  formik.setTouched({lname:true})
                }}
                style={{ border: formik.touched.lname &&formik.errors.lname ? 'solid 1px red' : '' }} />
              {formik.touched.lname && <small style={{color: 'red'}}>{formik.errors.lname}</small>}
            </div>
            <div className={signup["single-input"]}>
              <label htmlFor="pass">كلمة السر:</label>
              <input type="password" id="pass" name="password" 
              onChange={formik.handleChange}
              onBlur={()=>
                {
                  formik.setTouched({password:true})
                }}
                style={{ border: formik.touched.password &&formik.errors.password ? 'solid 1px red' : '' }} />
              {formik.touched.password && <small style={{color: 'red'}}>{formik.errors.password}</small>}
            </div>
          </div>
          <div className="row justify-content-between col-12">
            <h4>تسجيل ك :</h4>
            <div className='col-4 '>
              <input 
                  type="radio" 
                  id="user" 
                  name="role" 
                  value="user" 
                  onChange={formik.handleChange}
              />
              <label  htmlFor="role"> مستخدم </label>
            </div>
            <div className='col-4'>
              <input 
                  type="radio" 
                  id="engineer" 
                  name="role" 
                  value="engineer"
                  onChange={formik.handleChange}
              />
              <label htmlFor="role"> مهندس</label>
            </div>
            <div className='col-4'>
              <input 
                  type="radio" 
                  id="farmer" 
                  name="role" 
                  value ="farmer"
                  onChange={formik.handleChange}
              />
              <label htmlFor="role"> مزارع </label>
            </div>
          </div>
          <div className={`${signup["submit-btn"]} ${signup["signup-btn"]}`}>
            <input type="submit"  value="تسجيل"/>
          </div>

          <div className={signup["account-have"]}>
            <NavLink to="">الشروط والأحكام</NavLink>
            <NavLink to="/login">هل لديك حساب بالفعل ؟ </NavLink>
          </div>
          
        </div>
      </form>
    </div>
  </div>
  );
};

export default UserSignup;