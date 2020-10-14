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
                sessionStorage.userName = res.data.payload.username
            } catch (error) {
                setUser([])
            }
        }
        getUserInfo(`${API}/users/id/${currentUser.uid}`)
    }, [])
    
    return (
    <div className="loggedUser">
        <div className="infoDiv">
            <NavLink className="imgUsername" exact to={`/profile/${user.id}`}>
                <img className="infoDivAvatar" src={user.avatar}></img>
                <h4 className="infoDivUsername">{user.username}</h4>
                <h5 className="infoDivFullName">{user.full_name}</h5>
            </NavLink>
        </div>
    </div> 
)}

export default DisplayUser;