import React, { useState, useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider';
import { NavLink } from 'react-router-dom';
import axios from "axios"
import { apiURL } from '../util/apiURL';
import Search from './Search';
import '../css/Upload.css';
// import { storageRef } from '../firebase';
// import { useInput } from '../util/useInput';
import ig_logo from '../ImgFiles/ig_logo.png';
import { storage } from '../firebase';

const Upload = () => {
    const API = apiURL();
    const [image, setImage] = useState([]);
    const [imageName, setImageName] = useState("");
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const { token } = useContext(AuthContext);


    const [caption, setCaption] = useState("");
    const [hashtag, setHashtag] = useState("");

    // const dbUpload = async () => {
    //     try {
    //         let res = await axios({
    //             method: "post",
    //             url: `${API}/photos/update/`,
    //             headers: {
    //                 'AuthToken': token
    //             },
    //             params: {
    //                 'poster_id': sessionStorage.loggedUser, 
    //                 'imageURL': image.name
    //             }
    //         });
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageName(e.target.files[0].name);
            console.log(image);
            console.log(imageName);
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        // postPhoto();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                        console.log(url);
                    })
            }
        );
        setImage([]);
    }

    const postPhoto = async (e) => {
        e.preventDefault();
        try {
            let res = await axios({
                method: "post",
                url: `${API}/photos/`,
                headers: {
                    'AuthToken': token,
                    'Content-Type': 'application/json'
                },
                data: {
                    'poster_id': sessionStorage.loggedUser, 
                    'imageURL': `https://firebasestorage.googleapis.com/v0/b/my-ig-70b9f.appspot.com/o/images%2F${image.name}?alt=media&token=98fa2adf-25ce-44da-afdd-ba63c62ce693`,
                    'caption': caption
                },
            });
            handleUpload(e)
        } catch(error) {
            setImage([]);
        }
    }

    // const handleSubmit = async (e) => {
    //     try {
    //         let res = await axios({
    //             method: 'post',
    //             url: `${API}/photos/`,
    //             headers: {
    //                 'AuthToken': token
    //             },
    //             body: {
    //                 'poster_id': sessionStorage.loggedUser, 
    //                 'imageURL': image.name,
    //                 'caption': null
    //             }
    //         });
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // const handleNewPost = async () => {
    //     ;
    //     let newPost = await axios.post(`${API}/photos/`, {poster_id: sessionStorage.loggedUser, imageURL: file.name})
    //     handleNewHashtag(newPost.data.payload);
    //     window.location = '../home';
    // }

    // const handleNewHashtag = async (data) => {
    //     if (true) {
    //         let newHashtag = await axios.post(`${API}/photos/hashtag/`, {tagger_id: sessionStorage.loggedUser, photo_id: data.id})
    //     } else {
    //         console.log("No hashtag added")
    //     }
    // }

    return (
        <div className="mainUploadDiv">
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
            <div className="mainPage">
                <div className="uploadDiv">
                    <form className="uploadForm">
                        <h3>Upload Image</h3>
                        {progress === 100 ? <div>Image Uploaded!</div> : <progress value={progress} max ="100" id="uploader"/> }
                        <input className="uploadInput" type="file" name="myImage" id="fileButton" onChange={handleChange}/>
                        <label>
                            <input className="upload_input" type="text" placeholder="Caption" name="content" onChange={(e) => setCaption(e.target.value)} value={caption} />
                        </label>
                        {/* <label>
                            #
                            <input className="upload_input" type="text" placeholder="Hashtag" name="hashtag" onChange={(e) => setHashtag(e.target.value)} value={hashtag} />
                        </label> */}
                        <button className="upload_button" type="submit" onClick={postPhoto} /*disabled={imageName ? false : true}*/>Post</button>
                    </form>
                </div>
                <div className="photoUploadDiv">
                    {url? <img className="finalUpload" src={url} alt='firebase-image' /> : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default Upload;
