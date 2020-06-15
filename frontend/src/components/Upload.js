import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from "axios"
import { apiURL } from '../util/apiURL';
import Search from './Search';
import '../css/Upload.css';
// import { useInput } from '../util/useInput';
import ig_logo from '../ImgFiles/ig_logo.png';


const Upload = () => {
    const API = apiURL();
    const [file, setFile] = useState("");
    const [image, setImage] = useState("");

    // let contentObj = useInput("");
    // let hashtagObj=useInput("");

    const uploadImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);
        debugger;
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        debugger;
        let res = await axios.post(`${API}/photos/`, formData, config)
        console.log(res);
        if(res.data.status === "success") {
            console.log(res.data.payload)
            setImage(res.data.payload);
        } else {
            alert(`${res.data.status.message}`)
        }
    }

    const checkType = (e) => {
        let files = e.target.files;
        let err = '';
        const types = ['image/png', 'image/jpeg', 'image/gif'];
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + ' is not a supported format';
            }
        }
        if (err !== '') {
            e.target.value = null;
            alert(err);
            return false;
        }
        return true;
    }

    const selectImage = (e) => {
        if(checkType(e)) {
            setFile(e.target.files[0]);
        }
    }

    const handleNewPost = async () => {
        debugger;
        let newPost = await axios.post(`${API}/photos/`, {poster_id: sessionStorage.loggedUser, imageURL: file.name})
        handleNewHashtag(newPost.data.payload);
        window.location = '../home';
    }

    const handleNewHashtag = async (data) => {
        if (true) {
            let newHashtag = await axios.post(`${API}/photos/hashtag/`, {tagger_id: sessionStorage.loggedUser, photo_id: data.id})
        } else {
            console.log("No hashtag added")
        }
    }

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
                    <form onSubmit={uploadImage}>
                        <h3>Upload</h3>
                        <label>
                            Image
                            <input type="file" name="myImage" onChange={selectImage} />
                        </label>
                        {/* <button type="submit">Upload</button> */}
                    <label>
                        <input className="upload_input" type="text" placeholder="Caption" name="content" />
                    </label>
                    <label>
                        #
                        <input className="upload_input" type="text" placeholder="Hashtag" name="hashtag"  />
                    </label>
                    <button className="upload_button" onClick={handleNewPost}>Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Upload;