import React from "react";
import Serv from "./Service.module.css";
import Servimg1 from "../../Assets/images/service-icon1.png";
import Servimg2 from "../../Assets/images/service-icon2.png";
import Servimg3 from "../../Assets/images/service-icon3.png";
import Servimg4 from "../../Assets/images/service-icon4.png";

function ServiceHome() {
  return (
    <section className={Serv.Services}>
      <div className={Serv.container}>
        <div className={Serv.row}>
          <div className={Serv.services}>
            <div className={Serv.services_content}>
              <div className={`${["col-sm-3 col-xs-6"]} ${Serv.service}`}>
                <div className={Serv.service_img}>
                  <img alt="free shipping" src={Servimg1} />
                </div>
                <div className={Serv.service_content}>
                  <div className={Serv.services_title}>تسوق مجانًا</div>
                  <div className={Serv.service_desc}>
                    تمتع بتجربة تسوق سهلة وآمنة معنا
                  </div>
                </div>
              </div>

              <div className={`${["col-sm-3 col-xs-6"]} ${Serv.service}`}>
                <div className={Serv.service_img}>
                  <img alt="money back" src={Servimg2} />
                </div>
                <div className={Serv.service_content}>
                  <div className={Serv.services_title}>
                    إمكانية استرجاع المنتجات
                  </div>
                  <div className={Serv.service_desc}>
                    تمتع بمزايا عديدة، وامكانية استرجاع أو استبدال المنتجات
                  </div>
                </div>
              </div>

              <div className={`${["col-sm-3 col-xs-6"]} ${Serv.service}`}>
                <div className={Serv.service_img}>
                  <img alt="return policy" src={Servimg3} />
                </div>
                <div className={Serv.service_content}>
                  <div className={Serv.services_title}>استرجاع الأموال</div>
                  <div className={Serv.service_desc}>
                    استرجع أموالك بسهولة معنا
                  </div>
                </div>
              </div>

              <div className={`${["col-sm-3 col-xs-6"]} ${Serv.service}`}>
                <div className={Serv.service_img}>
                  <img alt="contact us" src={Servimg4} />
                </div>
                <div className={Serv.service_content}>
                  <div className={Serv.services_title}>تواصل معنا</div>
                  <div className={Serv.service_desc}>
                    تمتع معنا بخدمة تواصل سريعة ومتوافرة على مدار اليوم
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceHome;
