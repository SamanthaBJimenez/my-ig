import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import Hashtags from './Hashtags';
// import Comments from './Comments';
// import '../css/Image.css';


const Image = ({  filePath, username, avatar, caption, photoId }) => {
    // const [comment, setComment] = useState("");
   
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // let res = await signUp(email, password);
    //         // await axios.post(`${API}/users/`, { id: res.user.uid, username, password, full_name, email }); 
    //         // sessionStorage.loggedUser = res.user.uid
    //         // history.push("/home")
    //     } catch(err) {
    //         console.log(err);
    //     }

    // }

    return(
        <div className="photoStream">
            <div title={photoId} className="imageDiv">
                <h3 className="username">{username}</h3>
                <img alt="" src={avatar}/>
                <img alt="" className="photoPost" src={filePath}/>
                <div className="caption">
                <NavLink className="commenterLink" exact to={`/profile/${username}`}>
                    <p className="img_user">{username}</p> 
                </NavLink>
                    <p className="img_caption">{caption}</p>
                </div>
                {/* <Hashtags photoId={photoId} username={username}/> */}
                {/* <Comments photoId={photoId} username={username}/> */}
            </div>
        </div>
    )
}

export default Image;