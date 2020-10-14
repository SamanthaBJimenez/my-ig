import React, { useState, useEffect, useContext } from 'react';
import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import '../css/UserPhotoAlbum.css';
import { useParams } from 'react-router-dom';
import { Form, InputGroup, FormControl, Button, Modal, Col } from 'react-bootstrap';

const UserPhotoAlbum = ({userProf, totalPhotoAmount}) => {
    const { token } = useContext(AuthContext);
    const API = apiURL();
    const [photos, setPhotos] = useState([]);
    const [photoAmount, setPhotoAmount] = useState(0);
    const [show, setShow] = useState(false);
    const [changeId, setChangeId] = useState(0);
    const [caption, setCaption] = useState("");

    useEffect(() => {
        const getUserPhotos = async (userPhotosUrl) => {
            try {
                let res = await axios({
                    method: "get",
                    url: userPhotosUrl,
                    headers: {
                        'AuthToken': token
                    }
                });
                setPhotos(res.data.payload);
                setPhotoAmount(res.data.payload.length);
                totalPhotoAmount(photoAmount)
            } catch(error) {
                setPhotos([]);
            }
        }
        getUserPhotos(`${API}/photos/profile/${userProf}`)
    }, [userProf, photoAmount])

    const deletePhoto = async (e) => {
        try {
            let res = await axios.delete(`${API}/photos/${e.target.value}`);
            setPhotoAmount(photoAmount-1);
        } catch(error) {
            console.log(error)
        }
    }

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

    const handleShowEdit = (e) => {
        setShow(true);
        setChangeId(e.target.value);
    }

    const handleClose = () => {
        setShow(false);
        window.location.reload(true);
    };

    const userPhotosFeed = photos.map(photo => {
        let source = `https://firebasestorage.googleapis.com/v0/b/my-ig-70b9f.appspot.com/o/images%2F${photo.name}?alt=media&token=98fa2adf-25ce-44da-afdd-ba63c62ce693`
        return(
            <div className={userProf === sessionStorage.loggedUser ? "userPhotoContentI" : "userPhotoContent"}>
            {userProf === sessionStorage.loggedUser ?
                <div className="userEdit">
                    <button className='userPhotoBtn' type='button' onClick={deletePhoto} value={photo.id}>delete</button> 
                    <button className='userPhotoBtn' type='button' onClick={handleShowEdit} value={photo.id}>edit</button> 
                </div>
                : <div></div>
            }
                <img className='userPhoto' src={photo.imageurl} />
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
    })

    return (
        <div className="userPhotoAlbum">
            {userPhotosFeed}
        </div>
    )
}

export default UserPhotoAlbum;