import React, { useState, useEffect, useContext } from 'react';
import { Form, InputGroup, FormControl, Button, Modal, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import PostImage from './Image';
import Search from './Search';
import ig_logo from '../ImgFiles/ig_logo.png';
import '../css/Feed.css';
import DisplayUser from './DisplayUser';
import { storage } from '../firebase';
import Comments from './Comments';

const Feed = () => {
    const [photos, setPhotos] = useState([]);
    const [username, setUsername] = useState("");
    const [caption, setCaption] = useState("");
    const [hashtag, setHashtag] = useState("");
    const [show, setShow] = useState(false);
    const [changeId, setChangeId] = useState(0);
    const [friends, setFriends] = useState({});
    const API = apiURL();
    const { token } = useContext(AuthContext);
    const storageRef = storage.ref();
    sessionStorage.searchTerm = '';

    const fetchPhotos = async () => {
        try {
            let res = await axios({
                method: "get",
                url: `${API}/photos/`,
                headers: {
                    'AuthToken': token
                }
            });
            setPhotos(res.data.payload);
        } catch(error) {
            setPhotos([]);
        }
    }

    const fetchFriends = async () => {
        try {
            let res = await axios({
                method: "get",
                url: `${API}/users/follow/${sessionStorage.loggedUser}`,
            })
            let allFriends = {};
            console.log(res.data.payload);
            for(let index in res.data.payload) {
                allFriends[index] = res.data.payload[index].following_id;
            }
            console.log(allFriends);
            setFriends(allFriends);
        } catch(error) {
            console.log(error);
        }
    }

    const fetchSearch = async (url) => {
        try {
            let res = await axios({
                method: "get",
                url: url,
                headers: {
                    'AuthToken': token
                }
            });
        } catch(error) {
            setPhotos([]);
        }
    }

    const searchResult = () => {
        if(sessionStorage.searchTerm){
            return <button onClick={() => {sessionStorage.removeItem("searchTerm");window.location.reload()}}>Return to Homepage</button>
        } else {
            return null
        }
    }

    useEffect(() => {
        fetchFriends();
        fetchPhotos();
    }, [show])

    const editCaption = async (e) => {
        try {
            let id = changeId;
            let res = await axios.patch(`${API}/photos/edit/${id}`, {
                caption: caption
            });
            console.log(res.data.payload);
            handleClose();
        } catch(error) {
            console.log(error)
            handleClose();
        }
    }

    const handleClose = () => {
        setShow(false);
        window.location.reload(true);
    };

    const handleShowEdit = (e) => {
        setShow(true);
        setChangeId(e.target.value);
    }

    const photosFeed = photos.map(photo => {
        let names = Object.values(friends);
        if(names.includes(photo.user_id)) {
            let source = `https://firebasestorage.googleapis.com/v0/b/my-ig-70b9f.appspot.com/o/images%2F${photo.name}?alt=media&token=98fa2adf-25ce-44da-afdd-ba63c62ce693`
            console.log(photo.id)
            return(
                <div className="feedImgContent" key={photo.id}>
                    <div className="imgHeader">
                        <NavLink className="imgUsername" exact to={`/profile/${photo.user_id}`}><img className="avatarFeed" src={photo.avatar}/>{photo.username}</NavLink>
                    </div>
                    <img className='feedImg' src={photo.imageurl} />
                    {photo.caption ? <div className="content">
                        <NavLink className="imgUsername" exact to={`/profile/${photo.user_id}`}>
                            <p className="commenterNameP">{photo.username}</p>
                        </NavLink>
                        <p className="commentContent">{photo.caption}</p>
                    </div> : <div></div>}
                    <p>{hashtag}</p>
                    <Comments photo_id={photo.id}/>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Caption</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <input className="mb-2 edit_input" type="text" onChange={(e) => setCaption(e.target.value)} value={caption} />
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" type="submit" onClick={editCaption} value={photo.id}>Save</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
    })

    return(
        <div className="feed">
            <nav className="navbar">
                <div className="midNavDiv">
                    <NavLink className="ig_logoNav" exact to={"/home"}><p className="finstaNavbar" >Finstagram</p></NavLink>
                    <div className="search">
                        <Search/>
                    </div>
                    <div className="links">
                        <NavLink className="home" activeClassName={"home_selected"} exact to={"/home"}></NavLink>
                        <NavLink className="upload" activeClassName={"upload_selected"} exact to={"/upload"}></NavLink>
                        <NavLink className="profile" activeClassName={"profile_selected"} exact to={`/profile/${sessionStorage.loggedUser}`}></NavLink>
                    </div>
                </div>
            </nav>
            <div className='feedContent'>
                <div className="photosFeed">
                    {photosFeed}
                </div>
                <div className="profileFeed">
                    <DisplayUser/>
                </div>
            </div>
        </div>
    )
}

export default Feed;