const users = require('express').Router();
const {getAllUsers, createNewUser, getSingleUserById, getSingleUserByEmail, updateSingleUser} = require('../queries/Users');
const { checkFirebaseToken } = require('../middleware/auth');

users.get('/', /*checkFirebaseToken,*/ getAllUsers);
users.post('/', createNewUser);
users.get('/id/:id', getSingleUserById);
users.get('/email/:email', getSingleUserByEmail);
users.patch('/update', updateSingleUser);

module.exports = users;