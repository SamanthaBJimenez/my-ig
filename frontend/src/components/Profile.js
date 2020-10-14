import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserPhotoAlbum from './UserPhotoAlbum.js';
import Search from './Search';
import { logout } from '../util/firebaseFunctions';
import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';
import { Form, InputGroup, FormControl, Button, Modal, Col } from 'react-bootstrap';
import '../css/Profile.css';
import ig_logo from '../ImgFiles/ig_logo.png';
import axios from 'axios';
import { storage } from '../firebase';
import { useParams } from "react-router-dom";
import settings from './../ImgFiles/settings.png';
import log_out from './../ImgFiles/cancel.png';

const Profile = () => {
    const { token } = useContext(AuthContext);
    let [user, setUser] = useState([]);
    const [show, setShow] = useState(false);
    const [full_name, setFullname] = useState(user.full_name);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [newAvatar, setNewAvatar] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [totalPhotos, setTotalPhotos] = useState(0);
    const [followInfo, setFollowInfo] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [following, setFollowing] = useState([]);
    const [friends, setFriends] = useState(false);
    const API = apiURL();
    const { userProf } = useParams();

    useEffect(() => {
        const getUserInfo = async (userUrl, friendUrl) => {
            try {
                let res = await axios({
                    method: "get",
                    url: userUrl,
                    headers: {
                        'AuthToken': token
                    }
                });
                setUser(res.data.payload);
                setFullname(res.data.payload.full_name)
                setBio(res.data.payload.bio)
                setUsername(res.data.payload.username)
                setAvatarUrl(res.data.payload.avatar)
                setEmail(res.data.payload.email)
                let count = await axios({
                    method: "get",
                    url: friendUrl,
                    headers: {
                        'AuthToken': token
                    }
                });
                let following = 0;
                let followers = 0;
                console.log(count.data.payload.length)
                for (let i = 0; i < count.data.payload.length; i++) {
                    console.log(count.data.payload[i]);
                    if(count.data.payload[i].follower_id === userProf) {
                        following++
                    } else if(count.data.payload[i].following_id === userProf && count.data.payload[i].follower_id === sessionStorage.loggedUser) {
                        followers++
                        setFriends(true);
                        console.log(true);
                    } else if(count.data.payload[i].follower_id === userProf) {
                        followers++
                    }
                }
                setFollowingCount(following);
                setFollowersCount(followers);
                console.log('followingCount' + following);
                console.log('followersCount' + followers);
            } catch(error) {
                setUser([]);
            }
        }
        getUserInfo(`${API}/users/id/${userProf}`, `${API}/users/follow/${userProf}`)
    }, [userProf, friends])

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setNewAvatar(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        if(newAvatar !== "") {
            const uploadTask = storage.ref(`avatars/${newAvatar.name}`).put(newAvatar);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("avatars")
                        .child(newAvatar.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url);
                            console.log("The URL is ", url);
                        })
                }
            )
            handleEdit(e);
        } else {
            handleEdit(e);
        }
    }

    // const handlePhotoAmountChange = () => {
    //     setPhotoAmount();
    // };

    const handleClose = () => {
        setShow(false);
        window.location.reload(true);
    };

    const handleShow = () => setShow(true);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            let avatarInput = '';
            if(newAvatar.name) {
                avatarInput = `https://firebasestorage.googleapis.com/v0/b/my-ig-70b9f.appspot.com/o/avatars%2F${newAvatar.name}?alt=media&token=c8b555d1-e4ef-45f0-9a02-1ffdb672ef75`
            } else {
                avatarInput = avatarUrl
            }
            console.log(sessionStorage.loggedUser);
            let res = await axios.patch(`${API}/users/update`, {
                            id: sessionStorage.loggedUser,
                            username: username,
                            full_name: full_name,
                            bio: bio,
                            email: email,
                            avatar: avatarInput
            });
            console.log(res.data.payload);
            setProgress(101);
        } catch(error) {
            console.log(error)
        }
    }


    const follow = async (e) => {
        e.preventDefault();
        try {
            let res = await axios({
                method: "post",
                url: `${API}/users/follow`,
                headers: {
                    'AuthToken': token,
                    'Content-Type': 'application/json'
                },
                data: {
                    'follower': sessionStorage.loggedUser, 
                    'following_id': e.target.value
                },
            });
            setFriends(true);
            console.log(res);
        } catch(error) {
            console.log(error);
        }
    }

    const unfollow = async (e) => {
        e.preventDefault();
        try {
            let res = await axios({
                method: "delete",
                url: `${API}/users/unfollow/${sessionStorage.loggedUser}/${userProf}`,
                headers: {
                    'AuthToken': token,
                    'Content-Type': 'application/json'
                },
            });
            setFriends(false);
            console.log(res);
        } catch(error) {
            console.log(error);
        }
    }

    const displayUser = () => {
        return(
            <div className="displayLoggedUser">
                <div className="prof_avatar">
                    {avatarUrl ? <img className="avatarUpload" src={avatarUrl} alt='avatar_upload' /> : <div></div>}
                </div>
                <section className="prof_section">
                    <div className="prof_header">
                        <h1 className="profile_username">{user.username}</h1>
                        {userProf === sessionStorage.loggedUser ? <div></div> : friends === false ? <button className="follow_btn" onClick = {follow} value={userProf}>follow</button> : <button className="follow_btn" onClick = {unfollow} value={userProf}>unfollow</button>}
                        {userProf === sessionStorage.loggedUser ? <button className="profile_btn" onClick = {handleShow}><img className="settingsBtn" src={settings} alt="edit_button"/></button> : <div></div>}
                        {/* <img className="settingsBtn" src={settings} alt="edit_button"/> */}
                        {userProf === sessionStorage.loggedUser ? <NavLink className="profile_btn" onClick={logout} exact to={"/"}><img className="logoutBtn" src={log_out} alt="logout_button"/></NavLink> : <div></div>}
                    
                        {/* <NavLink className="profile_btn" onClick={logout} exact to={"/"}>Log Out</NavLink> */}
                    </div>
                    <div className='info_stats'>
                        {totalPhotos === 1 ? <p className="photoAmount">{totalPhotos} post</p> : <p className="photoAmount">{totalPhotos} posts</p>}
                        {followersCount === 1 ? <p className="photoAmount">{followersCount} follower</p> : <p className="photoAmount">{followersCount} followers</p>}
                        {followingCount === 1 ? <p className="photoAmount">{followingCount} following</p> : <p className="photoAmount">{followingCount} following</p>}
                    </div>
                    <div className="prof_info">
                        <div className="usernameDiv">
                            <p className="usernameP">{user.name}</p>
                        </div>
                        <div className="infoProfDiv">
                            <p className="fullNameP">{user.full_name}</p>
                            <p className="bioP">{user.bio}</p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    return(
        <div className="outer_profile_div">
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
            <div className="profileDiv">
                <div className="profileInfo">
                    {displayUser()}
                    <div>
                        <div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Your Information</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <input className="mb-2 edit_input" type="text" placeholder={user.name ? <div className='ifExists'>user.name</div> : "Enter Full Name"} onChange={(e) => setFullname(e.target.value)} value={full_name} />
                                        {/* <Form.Row>
                                            <InputGroup className="mb-2">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroup-sizing-sm">@</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <input className="edit_input username_input" type="text" placeholder={user.username ? user.username : "Enter Username"} onChange={(e) => setUsername(e.target.value)} value={username} />
                                            </InputGroup>
                                        </Form.Row> */}
                                        <input className="mb-2 edit_input" type="text" placeholder={user.email ? user.email : "Enter Email"} onChange={(e) => setEmail(e.target.value)} value={email} />
                                        <input className="mb-2 edit_input" type="text" placeholder={user.username ? user.username : "Enter Username"} onChange={(e) => setUsername(e.target.value)} value={username} />
                                        <input className="mb-2 edit_input" type="text" placeholder={user.bio ? user.bio : "Enter Bio"} onChange={(e) => setBio(e.target.value)} value={bio} />
                                        {user.avatar!==null ? <img className="finalAvatarUpload" src={user.avatar} alt='firebase-image' /> : <div></div>}
                                        <Form.Group>
                                            {progress > 100 ? <div className="upload_blurb">Edits Saved!</div> : 
                                                <div className="progress_div">
                                                    {progress === 100 ? <div className="upload_blurb">Image Uploaded!</div> : <progress value={progress} max="100" id="uploader"/> }
                                                </div>
                                            }
                                            <Form.File id="exampleFormControlFile1" label="" onChange={handleChange}/>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className={progress > 100 ? "modalButton hidden" : "modalButton"} variant="secondary" type="submit" onClick={handleUpload} >Save</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className="userAlbumDiv">
                    <UserPhotoAlbum userProf={userProf} totalPhotoAmount={photoAmount => setTotalPhotos(photoAmount)}/*onChange={handlePhotoAmountChange}*/ />
                </div>
            </div>
        </div>
    )
}

export default Profile;