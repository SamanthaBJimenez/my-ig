const db = require('../db/index');

const getAllUsers = async (req, res, next) => {
    try {
        let allUsers = await db.any('SELECT * FROM Users');
        res.status(200).json({
            status: 'success',
            message: 'all users retrieved',
            payload: allUsers
        });
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not retrieve all users'
        });
    }
}

const createNewUser = async (req, res, next) => {
    try {
        let newUser = await db.one(`INSERT INTO Users (id, username, password, full_name, email) VALUES('${req.body.id}', '${req.body.username}', '${req.body.password}', '${req.body.full_name}', '${req.body.email}') RETURNING *`);
        res.status(200).json({
            status: 'success',
            message: 'created a new user',
            payload: newUser
        });
    } catch(error) {
        res.json({
            status: error.detail,
            message: 'could not create a new user'
        });
    }
}

const getSingleUserById = async (req, res, next) => {
    try {
        let userById = await db.one('SELECT * FROM Users WHERE id = $1', [req.params.id]);
        res.status(200).json({
            status: 'success',
            message: 'single user retrieved by id',
            payload: userById
        });
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not retrieve single user by id'
        });
    }
}

const getSingleUserByEmail = async (req, res, next) => {
    try {
        let userByEmail = await db.one('SELECT * FROM Users WHERE email = $1', [req.params.email]);
        res.status(200).json({
            status: 'success',
            message: 'single user retrieved by email',
            payload: userByEmail
        });
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not retrieve single user by email'
        });
    }
}

const updateSingleUser = async (req, res, next) =>{    
    // const { username, full_name, bio, email, avatar } = req.body;
    // const { id } = req.params;
    try{
        let updateUser = await db.one(`UPDATE Users SET username = '${req.body.username}', full_name = '${req.body.full_name}', bio = '${req.body.bio}', email = '${req.body.email}', avatar = '${req.body.avatar}' WHERE id = '${req.body.id}' RETURNING *`)
        res.status(200).json({
            status: 'success',
            message: 'user updated',
            payload: updateUser
        })
    } catch(error){
        res.status(400).json({
            status: 'error',
            message: 'could not update user'
        })
    }
}

const addNewFollower = async (req, res, next) => {
    try {
        let friends = await db.one(`INSERT INTO Friends (follower, following_id) VALUES('${req.body.follower}', '${req.body.following_id}') RETURNING *`);
        res.status(200).json({
            status: 'success',
            message: 'you are now following user',
            payload: friends
        });
    } catch(error) {
        res.json({
            status: error.detail,
            message: 'you are not following user'
        });
    }
}

const unFollow = async (req, res, next) => {
    try {
        let unfollow = await db.one('DELETE FROM Friends WHERE follower = $1 AND following_id = $2 RETURNING *', [req.params.follower, req.params.following]);
        res.status(200).json({
            status: 'success',
            message: 'you are now unfollowing user',
            payload: unfollow
        });
    } catch(error) {
        res.json({
            status: error.detail,
            message: 'you are still following user'
        });
    }
}

const getAllFollowers = async (req, res, next) => {
    try {
        let allFollowers = await db.any('SELECT Friends.follower AS follower_id, Friends.following_id AS following_id, Users.username, Users.full_name, Users.avatar FROM Users JOIN Friends ON Friends.follower = Users.id OR Friends.following_id = Users.id WHERE Users.id = $1', [req.params.id]);
        res.status(200).json({
            status: 'success',
            message: 'got all following/followers',
            payload: allFollowers
        });
    } catch(error) {
        res.json({
            status: error.detail,
            message: 'could not get all following/followers'
        });
    }
}

module.exports = {getAllUsers, createNewUser, getSingleUserById, getSingleUserByEmail, updateSingleUser, addNewFollower, getAllFollowers, unFollow};