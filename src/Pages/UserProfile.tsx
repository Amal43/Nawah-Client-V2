import React from 'react';
import Nav from '../Components/Nav/Navbar';
import UserProfileSide from '../Components/UserProfile/UserProfileSide';

function UserProfile() {
    return (
        <div style={{ overflowY: "auto", height: "100vh" }}>
            <Nav/>
            <UserProfileSide/>
        </div>
    )
}

export default UserProfile;