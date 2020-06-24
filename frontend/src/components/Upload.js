import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from "axios"
import { apiURL } from '../util/apiURL';
import Search from './Search';
import '../css/Upload.css';
// import { storageRef } from '../firebase';
// import { useInput } from '../util/useInput';
import ig_logo from '../ImgFiles/ig_logo.png';
import { storageRef } from '../util/firebaseFunctions';


const Upload = () => {
    const API = apiURL();
    const [file, setFile] = useState("");
    // const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const [hashtag, setHashtag] = useState("")
    // let contentObj = useInput("");
    // let hashtagObj=useInput("");
    // const storage = app.storage();

    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const uploadImage = (e) => {
        debugger
        // let uploader = document.getElementById('uploader');
        // e.preventDefault()
        // console.log(storage);
        // debugger;
        // console.log('start of upload')
        // // async magic goes here...
        // if(imageAsFile === '') {
        // console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        // }
        // const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        // //initiates the firebase side uploading 
        // uploadTask.on('state_changed', 
        // (snapShot) => {
        // //takes a snap shot of the process as it is happening
        // console.log(snapShot)
        // }, (err) => {
        // //catches the errors
        // console.log(err)
        // }, () => {
        // // gets the functions from storage refences the image storage in firebase by the children
        // // gets the download url then sets the image from firebase as the value for the imgUrl key:
        // storage.ref('images').child(imageAsFile.name).getDownloadURL()
        // .then(fireBaseUrl => {
        //     setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
        // })
        // })

      
      // Get the file from DOM
    //   const file = document.getElementById("files");
      console.log(file);
      debugger
      //dynamically set reference to the file name
      var thisRef = storageRef.child(file);
        debugger
      //put request upload file to firebase storage
      thisRef.put(file).then(function(snapshot) {
         alert("File Uploaded")
         console.log('Uploaded a blob or file!');
         debugger
      });



    }

    // const checkType = (e) => {
    //     let files = e.target.files;
    //     let err = '';
    //     const types = ['image/png', 'image/jpeg', 'image/gif'];
    //     for (let x = 0; x < files.length; x++) {
    //         if (types.every(type => files[x].type !== type)) {
    //             err += files[x].type + ' is not a supported format';
    //         }
    //     }
    //     if (err !== '') {
    //         e.target.value = null;
    //         alert(err);
    //         return false;
    //     }
    //     return true;
    // }

    // const selectImage = (e) => {
    //     if(checkType(e)) {
    //         setFile(e.target.files[0]);
    //     }
    // }

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
                    <form onSubmit={uploadImage}>
                        <h3>Upload Image</h3>
                        <progress value="0" max ="100" id="uploader">0%</progress>
                        <input type="file" name="myImage" id="fileButton" /*onChange={handleImageAsFile}*/ value={file} onChange = {(e) => setFile(e.target.value)} />
                        {/* <button type="submit">Upload</button> */}
                    {/* <label>
                        <input className="upload_input" type="text" placeholder="Caption" name="content" onChange={(e) => setCaption(e.target.value)} value={caption} />
                    </label> */}
                    {/* <label>
                        #
                        <input className="upload_input" type="text" placeholder="Hashtag" name="hashtag" onChange={(e) => setHashtag(e.target.value)} value={hashtag} />
                    </label> */}
                    <button className="upload_button" type="submit">Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Upload;