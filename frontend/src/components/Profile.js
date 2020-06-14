import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
// import UserPhotoAlbum from './UserPhotoAlbum';
import Search from './Search';
import { logout } from '../util/firebaseFunctions';
import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';
import '../css/Profile.css';
import ig_logo from '../ImgFiles/ig_logo.png';
import axios from 'axios';

const Profile = () => {
    const { token } = useContext(AuthContext);
    let [user, setUser] = useState([]);
    const API = apiURL();

    useEffect(() => {
        const getUserInfo = async (url) => {
            try {
                let res = await axios({
                    method: "get",
                    url: url,
                    headers: {
                        'AuthToken': token
                    }
                });
                setUser(res.data.payload);
            } catch(error) {
                setUser([]);
            }
        }
        getUserInfo(`${API}/users/id/${sessionStorage.loggedUser}`)
    }, [])
   

    const displayUser = () => {
        return(
            <div className="displayLoggedUser">
                <section className="prof_section">
                    <div className="prof_header">
                        <h1 className="profile_username">{user.username}</h1>
                        <button className="profile_btn">Edit Profile</button>
                        <NavLink className="profile_btn" onClick={logout} exact to={"/"}>Log Out</NavLink>
                    </div>
                    <div className="prof_info">
                        <p>{user.name}</p>
                        <p>{user.bio}</p>
                    </div>
                </section>
            </div>
        )
    }

    return(
        <div className="outer_profile_div">
            <nav className="navbar">
                <div className="midNavDiv">
                    <NavLink className="ig_logo" exact to={"/home"}><img className='igImg' src={ig_logo} alt='instagram_logo'/></NavLink>
                    <div className="search">
                        <Search/>
                    </div>
                    <div className="links">
                        <NavLink className="home" activeClassName={"home_selected"} exact to={"/home"}></NavLink>
                        <NavLink className="upload" activeClassName={"upload_selected"} exact to={"/upload"}></NavLink>
                        <NavLink className="profile" activeClassName={"profile_selected"} exact to={"/profile"}></NavLink>
                    </div>
                </div>
            </nav>
            <div className="profileDiv">
                <div className="profileInfo">
                    {displayUser()}
                </div>
                <div className="userAlbumDiv">
                    {/* <UserPhotoAlbum/> */}
                </div>
            </div>
        </div>
    )
}

export default Profile;