import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import PostImage from './Image';
import Search from './Search';
import ig_logo from '../ImgFiles/ig_logo.png';
import '../css/Feed.css';

const Feed = () => {
    const [photos, setPhotos] = useState([]);
    const API = apiURL();
    const { token } = useContext(AuthContext);
    sessionStorage.searchTerm = '';

    const fetchData = async (url) => {
        try {
            let res = await axios({
                method: "get",
                url: url,
                headers: {
                    'AuthToken': token
                }
            });
            setPhotos(res.data.payload);
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
            fetchData(`${API}/photos/hashtag/tag/${sessionStorage.searchTerm}`);
            searchResult();
        } else {
            fetchData(`${API}/photos/`);
        }
    })

    const photosFeed = photos.map(photo => {
        return(<><PostImage key={photo.id} photoId={photo.id} avatar={photo.avatar} username={photo.username} filePath={photo.imageurl} caption={photo.caption}/></>)
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
            <div className="photosFeed">
                {photosFeed}
            </div>
            <div className="profileFeed">
                {/* <DisplayUser/> */}
            </div>
        </div>
    )
}

export default Feed;