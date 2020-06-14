import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { login } from '../util/firebaseFunctions';
import '../css/LogIn.css';
import ig_logo from '../ImgFiles/ig_logo.png';
import appStore_logo from '../ImgFiles/appStoreIcon.png';
import googlePlay_logo from '../ImgFiles/googlePlayIcon.png';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let res = await login(email, password);
        sessionStorage.loggedUser = res.user.uid
        history.push("/home");
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <div className="mainDiv">
            <div className="logIn">
                <div className="topDiv">
                    <img className='igImg_login' src={ig_logo} alt='instagram_logo'/>
                    <form className="logInForm" onSubmit={handleSubmit}>
                        <input className="login_input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input className="login_input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="on" />
                        <button className="login_button" type="submit">Log In</button> 
                    </form>
                </div>
                <div className="middleDiv">
                    <nav className="midNav">
                        Don't have an account? 
                        <NavLink className="signup" exact to={"/signup"}> Sign Up</NavLink>
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
        </div>
  );
}