import React, { useState, useEffect, useContext } from 'react';
import { apiURL } from '../util/apiURL';
import { NavLink } from 'react-router-dom';
import '../css/DisplayUser.css';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';


const DisplayUser = () =>{
    let [user,setUser] = useState([]);
    const API = apiURL();
    const { currentUser } = useContext(AuthContext);

    useEffect(()=>{
        const getUserInfo = async (url)=>{
            try {
                let res = await axios.get(url)
                setUser(res.data.payload)
            } catch (error) {
                setUser([])
            }
        }
        getUserInfo(`${API}/users/id/${currentUser.uid}`)
    }, [])
    
    return (
    <div className="loggedUser">
        {/* <NavLink className="avatar_home" exact to={"/profile"}><img className='avatarImg' src={avatar} alt='avatar_logo'/></NavLink> */}
        <div className="infoDiv">
            <h4 className="infoDivUsername">{user.username}</h4>
            <h5 className="infoDivFullName">{user.full_name}</h5>
        </div>
    </div> 
)}

export default DisplayUser;