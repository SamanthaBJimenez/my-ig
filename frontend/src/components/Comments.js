import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { apiURL } from '../util/apiURL';
// import '../css/Comments.css';


const Comments = () => {
    const [comment, setComment] = useState("");
    const { token } = useContext(AuthContext);
    const API = apiURL();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios({
                method: "post",
                url: `${API}/users/id/${sessionStorage.loggedUser}`,
                headers: {
                    'AuthToken': token
                }
            });
            // setUser(res.data.payload);
            // setFullname(res.data.payload.full_name)
            // setBio(res.data.payload.bio)
            // setUsername(res.data.payload.username)
        } catch(error) {
            // setUser([]);
        }
    }

    return(
        <div className="commentsStream">
            <form className="commentForm" onSubmit={handleSubmit}>
                <input className="comment_input" type="text" placeholder="comment" onChange={(e) => setComment(e.target.value)} value={comment} autoComplete="on" />
                <button className="comment_button" type="submit">submit</button>
            </form>            
        </div>
    )
}

export default Comments;