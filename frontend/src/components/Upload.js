import React, { useState } from 'react'
import { render } from 'react-dom';
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
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const [caption, setCaption] = useState("");
    const [hashtag, setHashtag] = useState("")

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
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
        )
    }

    // const handleNewPost = async () => {
    //     debugger;
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
            <div className="mainPage">
                <div className="uploadDiv">
                    <form className="uploadForm">
                        <h3>Upload Image</h3>
                        {progress === 100 ? <div>Image Uploaded!</div> : <progress value={progress} max ="100" id="uploader"/> }
                        <input className="uploadInput" type="file" name="myImage" id="fileButton" onChange={handleChange} />
                        {/* <button type="submit">Upload</button> */}
                    {/* <label>
                        <input className="upload_input" type="text" placeholder="Caption" name="content" onChange={(e) => setCaption(e.target.value)} value={caption} />
                    </label> */}
                    {/* <label>
                        #
                        <input className="upload_input" type="text" placeholder="Hashtag" name="hashtag" onChange={(e) => setHashtag(e.target.value)} value={hashtag} />
                    </label> */}
                    <button className="upload_button" type="submit" onClick={handleUpload}>Post</button>
                    </form>
                </div>
                <div>
                    {url? <img className="finalUpload" src={url} alt='firebase-image' width={500} height={500} /> : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default Upload;
// render(<Upload/>, document.querySelector("#root"));