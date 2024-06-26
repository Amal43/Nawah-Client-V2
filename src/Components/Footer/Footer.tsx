import FooterStyle from "./footerStyle.module.css";
import logo2 from "../../Assets/images/palm-leaf-products.jpg";

function Footer() {
  return (
    <>
      <footer className={FooterStyle.Footerr} >
        <div className={" py-3 px-0"}>
          <div className={"row p-0 m-0"}>
            {/* Logo&About */}
            <div className="col-md-3 text-center col-sm-6 mb-3 ps-5">
              <div className="justify-content-center text-dark d-flex mb-3  ">
                <img
                  className="img-fluid img-thumbnail"
                  style={{ width: "50px", height: "50px",borderRadius:70 }}
                  src={logo2} 
                  alt="logo"
                />
                <span className="fs-3  px-1">
                  نــــــــــــواه
                </span>
              </div>
              <p className="fs-6">
                نفتخر بأساليبنا العضوية الشاملة ونواصل الابتكار مستخدمين طرقًا
                زراعية فريدةً من نوعها لزراعة أفضل المحاصيل. تضمن عملياتنا
                الدقيقة للإنتاج بعد ذلك أن يدك هي اليد الوحيدة التي تمس التمور
                حتى بعد عملية الحصاد، مما يزيد من تفردنا.
              </p>
            </div>
            {/* شــــــركتنا */}
            <div className="col-md-3 col-sm-6 text-center justify-content-center mb-4">
              <h2 className="fs-3  ">
                شركتنـــا
              </h2>
              <ul>
                <li className={FooterStyle.list}>
                  <a href="/">لم ستختارنا</a>
                </li>
                <li className={FooterStyle.list}>
                  <a href="/">المساهمون</a>
                </li>
                <li className={FooterStyle.list}>
                  <a href="/">سياسة الخصوصية</a>
                </li>
                <li className={FooterStyle.list}>
                  <a href="/">شروط الخدمة</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6 text-center justify-content-center mb-4">
              <h2 className="fs-3  ">
                معلومات الموقع
              </h2>
              <ul>
                <li className={FooterStyle.list}>
                  <a href="/" className={FooterStyle.link}>
                    سياستنا
                  </a>
                </li>
                <li className={FooterStyle.list}>
                  <a href="/">الأحكام والشروط</a>
                </li>
                <li className={FooterStyle.list}>
                  <a href="/">اشعارات الخصوصية</a>
                </li>
                <li className={FooterStyle.list}>
                  <a href="/">تواصل معنا</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6 text-center justify-content-center mb-4">
              <h2 className="fs-3">
                معلومات عنا
              </h2>
              <ul>
                <li className={FooterStyle.list}>
                  <a href="/">من نحن</a>
                </li>
                <li className={FooterStyle.list}>
                  <a href="/">ماذا نقدم</a>
                </li>
                <li className={FooterStyle.list}>
                  <a href="/">خدماتنا</a>
                </li>
                <li className={FooterStyle.list}>
                  <a href="/">قيمنا</a>
                </li>
              </ul>
            </div>
            {/* <hr />
            <p className="lead fw-bold text-center">
              جميع الحقوق محفوظة لمعهد تكنولوجيا المعلومات 2023&copy;
            </p> */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
