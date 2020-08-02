const photosRouter = require('express').Router();
const {getAllPhotos, getPhotosByUser, getOnePhoto, addNewPhoto, deletePhoto, getPhotosByHashtag, addNewHashtag, getAllHashtags, getHashtagsByPhoto, getCommentsByPhoto, addNewComment} = require('../queries/Photos');
const { checkFirebaseToken } = require('../middleware/auth');

photosRouter.get('/', checkFirebaseToken, getAllPhotos);
photosRouter.get('/profile/:poster_id', getPhotosByUser)
photosRouter.get('/:id', getOnePhoto);
photosRouter.post('/', checkFirebaseToken, addNewPhoto);
photosRouter.delete('/:id', deletePhoto);
photosRouter.get('/hashtag/tag/:hashtag', getPhotosByHashtag);
photosRouter.get('/hashtag/all', getAllHashtags);
photosRouter.get('/hashtag/id/:photo_id', getHashtagsByPhoto);
photosRouter.post('/hashtag/', addNewHashtag)
photosRouter.get('/comments/:photo_id', checkFirebaseToken, getCommentsByPhoto);
photosRouter.post('/comments', addNewComment);

module.exports = photosRouter;