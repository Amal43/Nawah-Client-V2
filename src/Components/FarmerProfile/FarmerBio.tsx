import IFarmer from "../../interfaces/iFarmer";

function FarmerBio(farmer:any) {
  const farmerr:IFarmer =farmer?.Data;

  return (
    <div className="container" dir="rtl">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">معلومات المزارع:</h3>
          <div className="row">
              <div className={"fs-6 col-lg-6 col-md-12 mb-3"}>
                <span className={"fw-bold"}>الاسم : </span> {farmerr?.fname}
              </div>
              <div className={"fs-6 col-lg-6 col-md-12 mb-3"}>
                <span className={"fw-bold"}>اسم العائلة : </span> {farmerr?.lname}
              </div>
            
            <div className={"fs-6 col-lg-6 col-md-12 mb-3"}>
              <span className={"fw-bold"}>الدولة: </span> Egypt
            </div>
            <div className={"fs-6 col-lg-6 col-md-12  mb-3"}>
              <span className={"fw-bold"}>العنوان : </span> {farmerr?.address}
            </div>
            <div className={"fs-6 col-lg-6 col-md-12  mb-3"}>
              <span className={"fw-bold"}>الإيميل : </span> {farmerr?.email}
            </div>
            <div className={"fs-6 col-lg-6 col-md-12  mb-3"}>
              <span className={"fw-bold"}>رقم الهاتف : </span> {farmerr?.phone}
            </div>
            <div className={"fs-6 col-lg-6 col-md-12  mb-3"}>
              <span className={"fw-bold"}>مساحة الأرض : </span>  {farmerr?.farmarea} فدان
            </div>
            <div className={"fs-6 col-lg-6 col-md-12  mb-3"}>
              <span className={"fw-bold"}>عدد النخيل : </span> {farmerr?.cropamount} نخلة
            </div>
            <div className={"fs-6 col-md-6  mb-3"}>
              <span className={"fw-bold"}>أنواع المحصول : </span> {farmerr?.croptype}
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>


  )
}

export default FarmerBio;