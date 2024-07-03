import SucessPayement from '../Components/Checkout/SucessPayement';
import Nav from '../Components/Nav/Navbar';

function SuccessPayment() {
    return (
        <div style={{ overflowY: "auto", height: "100vh" }}>
            <Nav/>
            <SucessPayement/>
        </div>
    )
}

export default SuccessPayment;