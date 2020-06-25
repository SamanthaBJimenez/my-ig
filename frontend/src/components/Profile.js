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

const Profile = () => {
    const { token } = useContext(AuthContext);
    let [user, setUser] = useState([]);
    const [show, setShow] = useState(false);
    const [full_name, setFullname] = useState(user.full_name);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const API = apiURL();

    useEffect(() => {
        const getUserInfo = async (url) => {
            try {
                let res = await axios({
                    method: "get",
                    url: url,
                    headers: {
                        'AuthToken': token
                    }
                });
                setUser(res.data.payload);
                setFullname(res.data.payload.full_name)
                setBio(res.data.payload.bio)
                setUsername(res.data.payload.username)
            } catch(error) {
                setUser([]);
            }
        }
        getUserInfo(`${API}/users/id/${sessionStorage.loggedUser}`)
    }, [])

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
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
                    <div className="prof_info">
                        <p>{user.name}</p>
                        <p>{user.bio}</p>
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
                                    <input className="mb-2 edit_input" type="text" placeholder={user.name ? <div className='ifExists'>user.name</div> : "Enter Full Name"} onChange={(e) => setFullname(e.target.value)} value={full_name} />
                                    <Form.Row>
                                        <InputGroup className="mb-2">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroup-sizing-sm">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <input className="edit_input username_input" type="text" placeholder={user.username ? user.username : "Enter Username"} onChange={(e) => setUsername(e.target.value)} value={username} />
                                        </InputGroup>
                                    </Form.Row>
                                    <input className="mb-2 edit_input" type="text" placeholder={user.bio ? user.bio : "Enter Bio"} onChange={(e) => setBio(e.target.value)} value={bio} />
                                    <Form.Group>
                                        <Form.File id="exampleFormControlFile1" label="Example file input" />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className="modalButton" variant="secondary">Save</Button>
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