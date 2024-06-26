import IEngineer from "../../interfaces/iEngineer";

function EngineerBio(engineer:any) {
  
  const engineerr:IEngineer =engineer?.data;

  return (
    <>
    <div className="container" dir="rtl">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">معلومات المهندس:</h3>
          <div className="row">
              <div className={"fs-6 col-md-6 mb-3"}>
                <span className={"fw-bold"}>الاسم : </span> {engineerr?.fname}
              </div>
              <div className={"fs-6 col-md-6 mb-3"}>
                <span className={"fw-bold"}>اسم العائلة : </span> {engineerr?.lname}
              </div>
            
            <div className={"fs-6 col-md-6 mb-3"}>
              <span className={"fw-bold"}>الدولة: </span> Egypt
            </div>
            <div className={"fs-6 col-md-6  mb-3"}>
              <span className={"fw-bold"}>العنوان : </span> {engineerr?.address}
            </div>
            <div className={"fs-6 col-md-6  mb-3"}>
              <span className={"fw-bold"}>الإيميل : </span> {engineerr?.email}
            </div>
            <div className={"fs-6 col-md-6  mb-3"}>
              <span className={"fw-bold"}>رقم الهاتف: </span> {engineerr?.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default EngineerBio