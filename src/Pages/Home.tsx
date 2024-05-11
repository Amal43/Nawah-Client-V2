import Footer from "../Components/Footer/Footer";
import AboutHome from "../Components/Home/About-Home";
import HeaderHome from "../Components/Home/HeaderHome";
import ServiceHome from "../Components/Home/Service-Home";
import SliderHome from "../Components/Home/SliderHome";
import SubscriptHome from "../Components/Home/Subscript-Home";
import TrendingHome from "../Components/Home/Trending-Home";
import Nav from "../Components/Nav/Navbar";

function Home() {
    return (
        <div style={{ overflowY: "auto", height: "100vh" }}>
            <Nav/>
            <HeaderHome/>
            <AboutHome/>
            <TrendingHome />
            <ServiceHome/>
            <SliderHome/>
            <SubscriptHome/>
            <Footer/>
        </div>
    )
}

export default Home;