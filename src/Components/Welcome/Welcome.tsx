import welcome from './Welcome.module.css';
import { NavLink } from 'react-router-dom';

function Welcome() {
  return (
    <section className={welcome.welcome_section}>
      <div className={welcome.container}>
        <div className={welcome.header}>
          <h1>نــواة</h1>
        </div>
        <p>
          نساعدك لتعيش حياة صحية بشكل أفضل
        </p>
        <div className={welcome.row}>
          <NavLink to="/login" className={welcome.link}>
            سجل الدخول
          </NavLink>
          <NavLink to="/signup" className={welcome.link}>
            أنشئ حساب
          </NavLink>
        </div>
      </div>
    </section>
  )
}
export default Welcome;