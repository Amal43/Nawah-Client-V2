import Headercart from "../Components/Cart/Headercart";
import Tablecart from "../Components/Cart/Tablecart";
import Nav from "../Components/Nav/Navbar";

function Cart() {
    return (
        <div style={{ overflowY: "auto", height: "100vh" }}>
            <Nav/>
            <Headercart/>
            <Tablecart/>
        </div>
    )
}

export default Cart;