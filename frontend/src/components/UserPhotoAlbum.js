import React, { useState, useEffect, useContext } from 'react';
import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import '../css/UserPhotoAlbum.css';



const UserPhotoAlbum = () => {
    const { token } = useContext(AuthContext);
    const API = apiURL();
    const [photos, setPhotos] = useState([]);
    const [photoAmount, setPhotoAmount] = useState(0);


    useEffect(() => {
        const getUserPhotos = async (userPhotosUrl) => {
            try {
                // debugger;
                let res = await axios({
                    method: "get",
                    url: userPhotosUrl,
                    headers: {
                        'AuthToken': token
                    }
                });
                setPhotos(res.data.payload);
                setPhotoAmount(res.data.payload.length)
                // setUser(res.data.payload);
                // setFullname(res.data.payload.full_name)
                // setBio(res.data.payload.bio)
                // setUsername(res.data.payload.username)
                // setAvatar(res.data.payload.avatar)
                // setEmail(res.data.payload.email)
            } catch(error) {
                setPhotos([]);
            }
        }
        getUserPhotos(`${API}/photos/profile/${sessionStorage.loggedUser}`)
    }, [])

    const userPhotosFeed = photos.map(photo => {
        let source = `https://firebasestorage.googleapis.com/v0/b/my-ig-70b9f.appspot.com/o/images%2F${photo.name}?alt=media&token=98fa2adf-25ce-44da-afdd-ba63c62ce693`
        // debugger
        return(
            <div className="userPhotoContent">
                <img className='userPhoto' src={photo.imageurl} />
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