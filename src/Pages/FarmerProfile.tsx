import FarmarProfileSide from '../Components/FarmerProfile/FarmarProfileSide';
import Nav from '../Components/Nav/Navbar';

function FarmerProfile() {
    return (
        <div style={{ overflowY: "auto", height: "100vh" }}>
            <Nav/>
            <FarmarProfileSide/>
        </div>
    )
}

export default FarmerProfile;