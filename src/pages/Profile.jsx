import React from 'react';
import ProfileComponent from "../components/users/profile.jsx";
import "../assets/styles/dasboard/dasboard.css"
import "../assets/styles/users/profile.css"

function Profile() {
  return (
    <>
      <div className="content-profile">
        <ProfileComponent/>
      </div>
    </>
  );
}

export default Profile