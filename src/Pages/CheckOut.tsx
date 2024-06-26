import StripeContainer from "../Components/Checkout/StripeContainer";
import Nav from "../Components/Nav/Navbar";



function CheckOut() {
    return (
        <div style={{ overflowY: "auto", height: "100vh" }}>
            <Nav/>
            <StripeContainer/>
        </div>
    );
}
export default  CheckOut;
