import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
// import UserPhotoAlbum from './UserPhotoAlbum';
import Search from './Search';
import { logout } from '../util/firebaseFunctions';
import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';
import { Form, InputGroup, FormControl, Button, Modal, Col } from 'react-bootstrap';
import '../css/Profile.css';
import ig_logo from '../ImgFiles/ig_logo.png';
import axios from 'axios';
import { storage } from '../firebase';

const Profile = () => {
    const { token } = useContext(AuthContext);
    let [user, setUser] = useState([]);
    const [show, setShow] = useState(false);
    const [full_name, setFullname] = useState(user.full_name);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [avatar, setAvatar] = useState("");
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const API = apiURL();

    useEffect(() => {
        const getUserInfo = async (userUrl) => {
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
                setAvatar(res.data.payload.avatar)
                setEmail(res.data.payload.email)
            } catch(error) {
                setUser([]);
            }
        }
        getUserInfo(`${API}/users/id/${sessionStorage.loggedUser}`)
    }, [])

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    }
    console.log("avatar:", avatar);

    const handleUpload = (e) => {
        e.preventDefault();
        if(avatar !== "") {
            const uploadTask = storage.ref(`avatars/${avatar.name}`).put(avatar);
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
                        .child(avatar.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url);
                            console.log("The URL is ", url);
                        })
                }
            )
            handleEdit();
        } else {
            handleEdit();
        }
    }

    const handleClose = () => {
        setShow(false);
        window.location.reload(true);
    };

    const handleShow = () => setShow(true);

    const handleEdit = async () => {
        debugger;
        try {
            let res = await axios({
                method: "put",
                url: `${API}/users/update/${sessionStorage.loggedUser}`,
                headers: {
                    'AuthToken': token,
                    'Content-Type': 'application/json'
                },
                data: {
                    'username': username,
                    'full_name': full_name,
                    'bio': bio,
                    'email': email,
                    'avatar': `https://firebasestorage.googleapis.com/v0/b/my-ig-70b9f.appspot.com/o/avatars%2F${avatar.name}?alt=media&token=62e3e06a-6cb0-4a86-8cae-3823acf1ecdf`
                }
            });
            handleClose();
        } catch(error) {
            handleClose();
            console.log(error)
        }
    }

    const displayUser = () => {
        return(
            <div className="displayLoggedUser">
                <section className="prof_section">
                    <div className="prof_header">
                        <h1 className="profile_username">{user.username}</h1>
                        <button className="profile_btn" onClick = {handleShow}>Edit Profile</button>
                        <NavLink className="profile_btn" onClick={logout} exact to={"/"}>Log Out</NavLink>
                    </div>
                    <div className="prof_avatar">
                        {avatar ? <img className="avatarUpload" src={avatar} alt='avatar_upload' /> : <div></div>}
                    </div>
                    <div className="prof_info">
                        <div className="usernameDiv">
                            <p className="usernameP">{user.name}</p>
                        </div>
                        <div>
                            <p>{user.full_name}</p>
                            <p>{user.bio}</p>
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
                    <NavLink className="ig_logo" exact to={"/home"}><img className='igImg' src={ig_logo} alt='instagram_logo'/></NavLink>
                    <div className="search">
                        <Search/>
                    </div>
                    <div className="links">
                        <NavLink className="home" activeClassName={"home_selected"} exact to={"/home"}></NavLink>
                        <NavLink className="upload" activeClassName={"upload_selected"} exact to={"/upload"}></NavLink>
                        <NavLink className="profile" activeClassName={"profile_selected"} exact to={"/profile"}></NavLink>
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
                                        {user.avatar!==null ? <img className="finalUpload" src={user.avatar} alt='firebase-image' width={500} height={500} /> : <div></div>}
                                        <Form.Group>
                                            <div className="progress_div">
                                                {progress === 100 ? <div className="upload_blurb">Image Uploaded!</div> : <progress value={progress} max="100" id="uploader"/> }
                                            </div>
                                            <Form.File id="exampleFormControlFile1" label="" onChange={handleChange}/>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className={progress === 100 ? "modalButton hidden" : "modalButton"} variant="secondary" type="submit" onClick={handleUpload} >Save</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className="userAlbumDiv">
                    {/* <UserPhotoAlbum/> */}
                </div>
            </div>
        </div>
    )
}

export default Profile;