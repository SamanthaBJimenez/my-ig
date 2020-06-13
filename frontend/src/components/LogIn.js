import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { login } from '../util/firebaseFunctions';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <div>
    //   <h1>Login Page</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="Email"
    //       value={email}
    //     />
    //     <input
    //       type="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //       value={password}
    //       autoComplete="on"
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>

    <div className="mainDiv">
            <div className="logIn">
                <div className="topDiv">
                    {/* <img className='igImg_login' src={ig_logo} alt='instagram_logo'/> */}
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
                        {/* <img className='appStore_login' src={appStore_logo} alt='appStore_logo'/> */}
                        {/* <img className='googlePlay_login' src={googlePlay_logo} alt='googlePlay_logo'/> */}
                    </div>
                </div>
            </div>
        </div>
  );
}