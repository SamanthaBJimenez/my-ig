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
    try{
        let updateUser = await db.one(`UPDATE Users SET full_name = ${req.params.full_name}, bio = ${req.params.bio} WHERE id = ${req.params.id} RETURNING *`)
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

module.exports = {getAllUsers, createNewUser, getSingleUserById, getSingleUserByEmail, updateSingleUser};