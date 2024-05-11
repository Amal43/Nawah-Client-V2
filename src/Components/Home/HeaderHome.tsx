import React from "react";
import Header from "./HeaderHome.module.css";

function HeaderHome() {
  return (
    <section className={Header.intro}>
      <div className={Header.overlay}></div>
      <div className={Header.container}>
        <div className={Header.heroimage}>
          <div className={Header.herotext}>
            <h1 style={{ fontSize: 70 }}>
              <span> مرحبًا بكم </span> في موقعنا 
              <br></br>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeaderHome;
