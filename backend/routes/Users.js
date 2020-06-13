const users = require('express').Router();
const {getAllUsers, createNewUser, getSingleUserById, getSingleUserByEmail} = require('../queries/Users');
// const { checkFirebaseToken } = require('../../middleware/auth');

users.get('/', getAllUsers);
users.post('/', createNewUser);
users.get('/id/:id', getSingleUserById)
users.get('/email/:email', getSingleUserByEmail);

module.exports = users;