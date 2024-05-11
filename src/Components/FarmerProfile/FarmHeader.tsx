import IFarmer from '../../types/iFarmer';
import FarmarHederStyle from './FarmHeader.module.css';

export default function Header(farmer:any) {
  const farmerr:IFarmer = farmer?.Data;
  const api ="http://localhost:3001/uploads/";
  return (
    <>
      <section className={FarmarHederStyle.userprofile}>
            <div className={"container"}>
                <div className={FarmarHederStyle.user_header_section}>
                  <div className={FarmarHederStyle.profile_pic}>
                      <img className={FarmarHederStyle.imagepro}src={`${api}${farmerr?.img}`} alt="farmerImage"/>
                  </div>
                </div>
            </div>
      </section>
    </>
  )
}
