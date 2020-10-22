import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { apiURL } from '../util/apiURL';
import Timestamp from './Timestamp';
import '../css/Comments.css';


const Comments = ({photo_id, date}) => {
    const [photoComments, setPhotoComments] = useState([]);
    const [photoAmount, setPhotoAmount] = useState(0);
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
            setPhotoAmount(res.data.payload.length);
        } catch(error) {
            setPhotoComments([]);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/photos/comments`, {
                commenter_name: sessionStorage.userName,
                photo_id: photo_id,
                comment: comment
            });
            setComment("");
            fetchComments();
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [photoAmount])

    const deleteComment = async (e) => {
        try {
            let id = e.target.value
            let res = await axios.delete(`${API}/photos/comment/${id}`)
            setPhotoAmount(photoAmount - 1);
        } catch(error) {
            console.log(error)
        }
    }

    const allComments = photoComments.map(comment => {
        return(
            <div className="content" key={comment.id}>
                <NavLink className="commenterLink" exact to={`/profile/${comment.commenter_id}`}>
                    <p className="commenterNameP">{comment.commenter_name}</p>
                </NavLink>
                <p className="commentContent">{comment.comment}</p>
                {comment.commenter_name === sessionStorage.userName ? 
                <button className="commentDelete" type="button" onClick={deleteComment} value={comment.id}>x</button> :
                <div></div>}
            </div>
        )
    })

    return(
        <div className="commentsStream">
            <div className="photosComments">{allComments}</div>
            <Timestamp date={date}/>
            <form className="commentForm" onSubmit={handleSubmit}>
                <input className="comment_input" type="text" placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)} value={comment} autoComplete="on" />
                <input className="comment_button" type="button" value="Post" onClick={handleSubmit} disabled={comment ? false : true}/>
            </form>            
        </div>
    )
}

export default Comments;