import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { apiURL } from '../util/apiURL';
import { signUp } from '../util/firebaseFunctions';
import '../css/SignUp.css';
import ig_logo from '../ImgFiles/ig_logo.png';
import appStore_logo from '../ImgFiles/appStoreIcon.png';
import googlePlay_logo from '../ImgFiles/googlePlayIcon.png';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const history = useHistory();
    const API = apiURL();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await signUp(email, password);
            await axios.post(`${API}/users/`, { id: res.user.uid, username, password, full_name, email }); 
            sessionStorage.loggedUser = res.user.uid
            history.push("/home")
        } catch (err) {
            console.log(err);
        }

    }
    
    return (
        <div className="signUp">
            <div className="topDiv">
                <img className='igImg_signup' src={ig_logo} alt='instagram_logo'/>
                <h2 className="signup_blurb">Sign up to see photos and videos from your friends.</h2>
                <form className="signUpForm" onSubmit={handleSubmit}>
                    <input className="signup_input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input className="signup_input" type="text" placeholder="Full Name" onChange={(e) => setFullname(e.target.value)} value={full_name} />
                    <input className="signup_input" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
                    <input className="signup_input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="on" />
                    <button className="signUp_button" type="submit">Sign Up</button>
                </form>
                <p className="finePrint">By signing up, you agree to our Terms, Data Policy and Cookies Policy.</p>
            </div>
            <div className="middleDiv">
                <nav className="midNav">
                    Have an account?
                    <NavLink className="login" exact to={"/"}> Log in</NavLink>
                </nav>
            </div>
            <div className="bottomDiv">
                    <p className="bottomP">Get the app.</p>
                    <div className="appLinks">
                        <img className='appStore_login' src={appStore_logo} alt='appStore_logo'/>
                        <img className='googlePlay_login' src={googlePlay_logo} alt='googlePlay_logo'/>
                    </div>
            </div>
        </div>
    );
};