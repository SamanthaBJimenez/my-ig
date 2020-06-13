import React from 'react';
import { NavLink } from 'react-router-dom';

const Feed = () => {

    return(
        <div className="feed">
            <nav className="navbar">
                <div className="midNavDiv">
                    {/* <NavLink className="ig_logo" exact to={"/home"}><img className='igImg' src={ig_logo} alt='instagram_logo'/></NavLink> */}
                    <div className="search">
                        {/* <Search/> */}
                    </div>
                    <div className="links">
                        <NavLink className="home" activeClassName={"home_selected"} exact to={"/home"}>Home</NavLink>
                        <NavLink className="upload" activeClassName={"upload_selected"} exact to={"/upload"}>Upload</NavLink>
                        <NavLink className="profile" activeClassName={"profile_selected"} exact to={"/profile"}>Profile</NavLink>
                    </div>
                </div>
            </nav>
            <div className="photosFeed">
                {/* {photosFeed} */}
            </div>
            <div className="profileFeed">
                {/* <DisplayUser/> */}
            </div>
        </div>
    )
}

export default Feed;