import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { apiURL } from '../util/apiURL';
import { signUp } from '../util/firebaseFunctons';

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
            await axios.post(`${API}/users/`, {id: res.user.uid, username: username, password: password, full_name: full_name, avatar: null, email: email});      
            history.push("/home")
        } catch (err) {
            console.log(err);
        }

    }
    
    return (
      <div>
        <h1>Sign Up Page</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
            autoComplete="on"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
};