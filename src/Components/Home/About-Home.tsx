import React from "react";
import { NavLink } from "react-router-dom";
import Aboutimg from "../../Assets/images/about-us.png";
import about from "./About.module.css";
function AboutHome() {
  return (
    <section className={about.About}>
      <div className={"container"}>
        <div className={about.row}>
          <div className={about.about__img}>
            <img src={Aboutimg} alt="" />
          </div>
          <div className={about.about__text}>
            <div className={about.abouttext}>
              <h3>معلومات عنا</h3>
              <p>
                {" "}
                نفتخر بأساليبنا العضوية الشاملة ونواصل الابتكار مستخدمين طرقًا
                زراعية فريدةً من نوعها لزراعة أفضل المحاصيل. تضمن عملياتنا
                الدقيقة للإنتاج بعد ذلك أن يدك هي اليد الوحيدة التي تمس التمور
                حتى بعد عملية الحصاد، مما يزيد من تفردنا.
              </p>
            </div>
            <div className={about.about_counter}>
              <div className={about.counter}>
                <div className={about.num}>١٠</div>
                <div className={about.desc}>
                  <h6>رضاء عملائنا</h6>
                </div>
              </div>

              <div className={about.counter}>
                <div className={about.num}>٨</div>
                <div className={about.desc}>
                  <h6>توصيل مجاني</h6>
                </div>
              </div>

              <div className={about.counter}>
                <div className={about.num}>٥ </div>
                <div className={about.desc2}>
                  <h6>المخازن</h6>
                </div>
              </div>
            </div>
            <div className={about.about_btn}>
              <NavLink to={'/product'}>تسوق الآن</NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHome;
