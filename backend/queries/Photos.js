const db = require('../db/index');

const getAllPhotos = async (req, res, next) => {
    try {
        let allPhotos = await db.any('SELECT Photos.id, Photos.imageURL, Photos.caption, Users.username FROM Photos LEFT JOIN Users ON Photos.poster_id=Users.id ORDER BY time_stamp DESC');
        res.status(200).json({
            status: 'success',
            message: 'all photos retrieved',
            payload: allPhotos
        });
    } catch(error) {
        console.log(error)
        res.status(400).json({
            status: 'error',
            message: 'could not retrieve all photos'
        });
    }
}

const getPhotosByUser = async (req, res, next) => {
    try {
        let usersPhotos = await db.any('SELECT Photos.id, Photos.poster_id, Photos.imageURL, Photos.caption, Users.username FROM Photos LEFT JOIN Users ON Photos.poster_id=Users.id WHERE poster_id = $1 ORDER BY time_stamp', [req.params.poster_id])
        res.status(200).json({
            status: 'success',
            message: 'all photos by user rertrieved',
            payload: usersPhotos
        })
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not retrieve users photos'
        })
    }
}

const getOnePhoto = async (req, res, next) => {
    try {
        let onePhoto = await db.one('SELECT * FROM Photos WHERE id = $1', [req.params.id]);
        res.status(200).json({
            status: 'success',
            message: 'one photo retrieved',
            payload: onePhoto
        });
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not get photo'
        });
    }
}

const addNewPhoto = async (req, res, next) => {
    try {
        let newPhoto = await db.one(`INSERT INTO Photos (poster_id, imageURL, caption) VALUES('${req.body.poster_id}', '${req.body.imageURL}', '${req.body.caption}') RETURNING *`);
        res.status(200).json({
            status: 'success',
            message: 'posted new photo',
            payload: newPhoto
        });
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not post new photo'
        });
    }
}

const deletePhoto = async (req, res, next) => {
    try {
        let deletePhoto = await db.one('DELETE FROM Photos WHERE id = $1 RETURNING *', [req.params.id]);
        res.status(200).json({
            status: 'success',
            message: 'photo deleted',
            payload: deletePhoto
        });
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not delete photo'
        });
    }
}

const getPhotosByHashtag = async (req, res, next) => {
    try {
        let photosByHashtag = await db.any(`SELECT Photos.id, Photos.imageURL, Photos.caption, Users.username, Users.avatar FROM Photos JOIN Hashtags ON Hashtags.photo_id = Photos.id LEFT JOIN Users ON Photos.poster_id = Users.id WHERE tag_name = $1 ORDER BY time_stap DESC`, [req.params.hashtag]);
        res.status(200).json({
            status: 'success',
            message: 'photos retrieved by hashtag',
            payload: photosByHashtag
        });
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not retrieve photos by hashtag'
        });
    }
}

const addNewHashtag = async (req, res, next) => {
    try {
        let newHashtag = await db.one(`INSERT INTO Hashtags (tagger_id, photo_id, tag_name) VALUES('${req.body.tagger_id}', '${req.body.photo_id}', '${req.body.tag_name}') RETURNING *`);
        res.status(200).json({
            status: 'success',
            message: 'posted new hashtag',
            payload: newHashtag
        });
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not post new hashtag'
        });
    }
}

const getAllHashtags = async (req, res, next) => {
    try {
        let allHashtags = await db.any(`SELECT * FROM Hashtags`);
        res.status(200).json({
            status: 'success',
            message: 'all hashtags retrieved',
            payload: allHashtags
        })
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not retrieve all hashtags'
        })
    }
}

const getHashtagsByPhoto = async (req, res, next) => {
    try {
        let hashtagsByPhoto = await db.any(`SELECT * FROM Hashtags WHERE photo_id = $1`, [req.params.photo_id]);
        res.status(200).json({
            status: 'success',
            message: 'all hashtags for photo retrieved',
            payload: hashtagsByPhoto
        })
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not retrieve hashtags for this photo'
        })
    }
}

const getCommentsByPhoto = async (req, res, next) => {
    try {
        let commentsByPhoto = await db.any('SELECT * FROM Comments WHERE photo_id = $1', [req.params.photo_id]);
        res.status(200).json({
            status: 'success',
            message: 'all comments for photos retrieved',
            payload: commentsByPhoto
        })
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: 'could not retrieve comments for this photo'
        })
    }
}

const addNewComment = async (req, res, next) => {
    try {
        let newComment = await db.one(`INSERT INTO Comments (commenter_name, photo_id, comment) VALUES ('${req.body.commenter_name}', '${req.body.photo_id}', '${req.body.comment}') RETURNING *`);
        res.status(200).json({
            status: 'success',
            message: 'added new comment',
            payload: newComment
        })
    } catch(error) {
        console.log(req);
        res.status(400).json({
            status: 'error',
            message: 'could not create new comment'
        })
    }
}

module.exports = {getAllPhotos, getPhotosByUser, getOnePhoto, addNewPhoto, deletePhoto, getPhotosByHashtag, getAllHashtags, addNewHashtag, getHashtagsByPhoto, getCommentsByPhoto, addNewComment};