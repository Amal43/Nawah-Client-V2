import Nav from '../Components/Nav/Navbar';
import Footer from '../Components/Footer/Footer';
import Cont from '../Components/Contact/Cont';

function Contact() {
    return (
        <div style={{ overflowY: "auto", height: "100vh" }}>
            <Nav/>
            <Cont/>
            <Footer/>
        </div>
    )
}

export default Contact;