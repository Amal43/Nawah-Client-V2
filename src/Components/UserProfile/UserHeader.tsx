import { IUser } from '../../types/iUser';
import UserHederStyle from './UserHeader.module.css';

export default function Header(user:any) {
  const userr:IUser =user?.UserData;
  const api ="http://localhost:3001/uploads/";
  
  return (
    <>
      <section className={ UserHederStyle.userprofile}>
        <div className={"container"}>
            <div className={ UserHederStyle.user_header_section}>
              <div className={ UserHederStyle.profile_pic}>
                  <img className={ UserHederStyle.imagepro} src={`${api}${userr?.img}`}  alt="avater"/>
              </div>
            </div>
        </div>
      </section>
    </>
  )
}
