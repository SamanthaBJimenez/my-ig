import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { login } from '../util/firebaseFunctions';
import '../css/LogIn.css';
import ig_logo from '../ImgFiles/ig_logo.png';
import appStore_logo from '../ImgFiles/appStoreIcon.png';
import googlePlay_logo from '../ImgFiles/googlePlayIcon.png';
import iphone from './../ImgFiles/iphone.png';
import iphoneBack from './../ImgFiles/iphoneBack.jpg';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let res = await login(email, password);
        sessionStorage.loggedUser = res.user.uid;
        history.push("/home");
    } catch (err) {
        alert(err);
    }
  };

  const handleDemo = async (e) => {
      e.preventDefault();
      try {
          let res = await login("joey@gmail.com", "joeymoey");
          console.log("joey@gmail.com")
          sessionStorage.loggedUser = "gMfw4cWqRMNmPNnEZTbHSlVY72q1";
          history.push("/home");
      } catch (err) {
          alert(err);
      }
  }

  return (
    <div className="mainDiv">
            <div className="logIn">
                <img className="iphoneImg" src={iphone}/>
                <img className="iphoneBack" src={iphoneBack} width="461" height="821"></img>
                
                <div className="topDivLogIn">
                    {/* <img className='igImg_login' src={ig_logo} alt='instagram_logo'/> */}
                    <p className="finstaTitle" >Finstagram</p>
                    <button className="login_button" type="submit" style={{"background":"limegreen"}} onClick={handleDemo}>Demo Log In</button> 
                    <form className="logInForm" onSubmit={handleSubmit}>
                        <input className="login_input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input className="login_input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="on" />
                        <button className="login_button" type="submit">Log In</button> 
                    </form>
                </div>
                <div className="middleDivLogIn">
                    <nav className="midNav">
                        Don't have an account? 
                        <NavLink className="signup" exact to={"/signup"}> Sign Up</NavLink>
                    </nav>
                </div>
                {/* <div className="bottomDiv">
                    <p className="bottomP">Get the app.</p>
                    <div className="appLinks">
                        <img className='appStore_login' src={appStore_logo} alt='appStore_logo'/>
                        <img className='googlePlay_login' src={googlePlay_logo} alt='googlePlay_logo'/>
                    </div>
                </div> */}
            </div>
        </div>
  );
}