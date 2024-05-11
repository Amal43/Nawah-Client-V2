import { useState } from 'react';
import contactStyle from './Contact.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../Assets/images/contactbg.png';
import { useDispatch } from 'react-redux';
import { addmessage } from "../../Redux/Slices/MessageSlice";
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';


function Cont() {
  const dispatch = useDispatch()<any| object| AsyncThunkConfig>;
  let formik = useFormik({
    initialValues: {
      email: "",
      contactMessage: "",
    },
    // validationSchema:schema,
    onSubmit: async (values) => {
      try {
        dispatch(addmessage(values))
      } catch (error) {
      }
    }
  })

  return (
    <section className={contactStyle.contactussection} id={contactStyle.contactussection}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className={contactStyle['section-text']}>
              <h2 className={contactStyle['section-title']}>تواصل معنا</h2>
              <p className={contactStyle['section-description']}>
                في حال احتياجك إلى التحدث معنا لأي سبب لا تتردد في التواصل معنا
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className={contactStyle['contact-form']}>
              <form method="post" className={contactStyle['contact-form-aqua']} onSubmit={formik.handleSubmit}>
                <h2 className={contactStyle['contact-head']}>أرسل رسالة :</h2>
                <input
                  type="email"
                  name="email"
                  required 
                  placeholder="* الايميل"
                  className={contactStyle['contact-frm']}
                  onChange={formik.handleChange}
                />
                <textarea
                  name="contactMessage"
                  id="contactMessage"
                  placeholder="* الرسالة"
                  className={contactStyle["contact-msg"]}
                  defaultValue={""}
                  onChange={formik.handleChange}
                />
                <input
                  type="submit"
                  defaultValue="ارسال"
                  value="ارسال"
                  className={contactStyle["global-btn"]}
                />
                <br />
                <br />
                <span className={contactStyle['msgSubmit']} />
              </form>
            </div>
          </div>

          <div className="col-lg-6 mx-auto">
            <div className={contactStyle['contact-img']}>
              <img src={img} alt="#" />
            </div>
          </div>

        </div>
      </div>
    </section>

  )
}

export default Cont
 