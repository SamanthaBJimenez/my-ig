const users = require('express').Router();
const {getAllUsers, createNewUser, getSingleUserById, getSingleUserByEmail, updateSingleUser, addNewFollower, getAllFollowers, unFollow} = require('../queries/Users');
const { checkFirebaseToken } = require('../middleware/auth');

users.get('/', /*checkFirebaseToken,*/ getAllUsers);
users.post('/', createNewUser);
users.get('/id/:id', getSingleUserById);
users.get('/email/:email', getSingleUserByEmail);
users.patch('/update', updateSingleUser);
users.post('/follow', checkFirebaseToken, addNewFollower);
users.get('/follow/:id', getAllFollowers);
users.delete('/unfollow/:follower/:following', checkFirebaseToken, unFollow);

module.exports = users;