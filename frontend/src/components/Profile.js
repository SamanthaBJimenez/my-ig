import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../util/firebaseFunctions';

const Profile = () => {
    return(
        <div>
            <NavLink className="profile_btn" onClick={logout} exact to={"/"}>Log Out</NavLink>
        </div>
    )
}; 

export default Profile;