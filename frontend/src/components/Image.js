import React from 'react';
// import Hashtags from './Hashtags';
// import Comments from './Comments';
// import '../css/Image.css';


const Image = ({  filePath, username, avatar, caption, photoId }) => {
   
    return(
        <div className="photoStream">
            <div title={photoId} className="imageDiv">
                <h3 className="username">{username}</h3>
                <img alt="" src={avatar}/>
                <img alt="" className="photoPost" src={filePath}/>
                <div className="caption">
                    <p className="img_user">{username}</p> 
                    <p className="img_caption">{caption}</p>
                </div>
                {/* <Hashtags photoId={photoId} username={username}/> */}
                {/* <Comments photoId={photoId} username={username}/> */}
            </div>
        </div>
    )
}

export default Image;