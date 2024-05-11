import IEngineer from '../../types/iEngineer';
import FarmarHederStyle from '../FarmerProfile/FarmHeader.module.css';

function Header(engineer:any) {
  const engineerr:IEngineer =engineer?.data;
  const api ="http://localhost:3001/uploads/";

  return (
    <>
          <section className={FarmarHederStyle.userprofile}>
            <div className={"container"}>
                <div className={FarmarHederStyle.user_header_section}>
                  <div className={FarmarHederStyle.profile_pic}>
                      <img className={FarmarHederStyle.imagepro}src={`${api}${engineerr?.img}`} alt="avatar"/> 
                  </div>
                </div>
            </div>
      </section>
      </>
  )
}

export default Header;