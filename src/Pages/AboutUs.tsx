import About from '../Components/AboutUs/About';
import Nav from '../Components/Nav/Navbar';
import Footer from '../Components/Footer/Footer';

function AboutUs() {
    return (
        <div style={{ overflowY: "auto", height: "100vh" }}>
            <Nav/>
            <About/>
            <Footer/>
        </div>
    )
}

export default AboutUs;