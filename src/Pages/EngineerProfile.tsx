import EngineerProfileSide from '../Components/EngineerProfile/EngineerProfileSide';
import Nav from '../Components/Nav/Navbar';

function EngineerProfile() {
    return (
        <div style={{ overflowY: "auto", height: "100vh" }}>
            <Nav/>
            <EngineerProfileSide/>
        </div>
    )
}

export default EngineerProfile;