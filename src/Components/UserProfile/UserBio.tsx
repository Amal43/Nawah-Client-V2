import { IUser } from "../../interfaces/iUser";

function UserBio(user:any) {
  const userr:IUser =user?.UserData;
  return (
    <div className="container" dir="rtl">
        {/* Bio Graph Started */}
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">معلومات المستخدم:</h3>
            <div className="row">
              <div className="fs-6 col-md-6">
                <span className="fw-bold">الاسم : </span> {userr?.fname}
              </div>
              <div className="fs-6 col-md-6 ">
                <span className="fw-bold">اسم العائلة : </span> {userr?.lname}
              </div>
              <div className="fs-6 col-md-6">
                <span className="fw-bold">العنوان : </span> {userr?.address}
              </div>
              <div className="fs-6 col-md-6">
                <span className="fw-bold">الإيميل : </span> {userr?.email}
              </div>
              <div className="fs-6 col-md-6">
                <span className="fw-bold">رقم الهاتف : </span> {userr?.phone}
              </div>
              
            </div>
          </div>
        </div>     
    </div>
  )
}

export default UserBio;