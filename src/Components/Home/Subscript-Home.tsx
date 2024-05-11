import React from "react";
import Sub from "./Subscript.module.css";
function SubscriptHome() {
  return (
    <section className={Sub.SingUp}>
      <div className={Sub.container}>
        <div className={Sub.row}>
          <div className={Sub.singup__text}>
            <h2>
              <i className={`${["fa-solid fa-envelope"]}`}></i>
              اشترك في نشرتنا الإخبارية
            </h2>
          </div>
          <div className={Sub.singup__input}>
            <input type="text" placeholder="أدخل رسالتك هنا" />
            <button>اشتراك</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubscriptHome;
