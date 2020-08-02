import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { apiURL } from '../util/apiURL';
import '../css/Comments.css';


const Comments = ({photo_id}) => {
    const [photoComments, setPhotoComments] = useState([]);
    const [comment, setComment] = useState("");
    const { token } = useContext(AuthContext);
    const API = apiURL();

    const fetchComments = async () => {
        try {
            let res = await axios({
                method: "get",
                url: `${API}/photos/comments/${photo_id}`,
                headers: {
                    'AuthToken': token
                }
            });
            setPhotoComments(res.data.payload);
        } catch(error) {
            setPhotoComments([]);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger
        try {
            debugger
            await axios.post(`${API}/photos/comments`, {
                commenter_name: sessionStorage.userName,
                photo_id: photo_id,
                comment: comment
            });
            fetchComments();
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        fetchComments();
    })

    const allComments = photoComments.map(comment => {
        // debugger
        return(
            <div className="content">
                <p className="commenterNameP">{comment.commenter_name}</p>
                <p className="commentContent">{comment.comment}</p>
                {/* <p className="commentContent">{comment.time_stamp}</p> */}
            </div>
        )
    })

    return(
        <div className="commentsStream">
            <div className="photosComments">{allComments}</div>
            <form className="commentForm" onSubmit={handleSubmit}>
                <input className="comment_input" type="text" placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)} value={comment} autoComplete="on" />
                {/* <input  type="button" value="post" onClick={handleSubmit}/> */}
                <button className="comment_button" type="button" onClick={handleSubmit}>Post</button>
            </form>            
        </div>
    )
}

export default Comments;