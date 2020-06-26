import React, { useState, useEffect, useContext } from 'react';
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

const Feed = () => {
    const [photos, setPhotos] = useState([]);
    const API = apiURL();
    const { token } = useContext(AuthContext);
    const storageRef = storage.ref();
    sessionStorage.searchTerm = '';

    const fetchPhotos = async () => {
        try {
            // let res = await axios({
            //     method: "get",
            //     url: url,
            //     headers: {
            //         'AuthToken': token
            //     }
            // });
            // setPhotos(res.data.payload);
            const listRef = storageRef.child(`images/`)
            const firstPage = await listRef.list({ maxResults: 100});
            setPhotos(firstPage.items)
        } catch(error) {
            setPhotos([]);
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
            // debugger;
            setPhotos(res.data.payload);
            // debugger;
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
        if(sessionStorage.searchTerm){
            fetchSearch(`${API}/photos/hashtag/tag/${sessionStorage.searchTerm}`);
            searchResult();
        } else {
            fetchPhotos();
        }
    })

    const photosFeed = photos.map(photo => {
        let source = `https://firebasestorage.googleapis.com/v0/b/my-ig-70b9f.appspot.com/o/images%2F${photo.name}?alt=media&token=98fa2adf-25ce-44da-afdd-ba63c62ce693`
        return(
            <div className="content">
                <img className='feedImg' src={source} />
            </div>
        )
        // return(<><PostImage key={photo.id} photoId={photo.id} avatar={photo.avatar} username={photo.username} filePath={photo.imageurl} caption={photo.caption}/></img>)
    })

    return(
        <div className="feed">
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