import headercartstyle from'./Headercart.module.css';

function Headercart() {
    return (
      <section className={headercartstyle.header_cart}>
        <div className="container">
          <div className={headercartstyle.header_cart_section}>
            <div className={headercartstyle.header_cart_text}>
              <h1>
                عربة التسوق ➸
              </h1>
            </div>
          </div>
        </div>
      </section>
    )
}
export default Headercart;