const photosRouter = require('express').Router();
const {getAllPhotos, getPhotosByUser, getPhotosByFriends, getOnePhoto, addNewPhoto, deletePhoto, getPhotosByHashtag, addNewHashtag, getAllHashtags, getHashtagsByPhoto, getCommentsByPhoto, addNewComment, deleteComment, editCaption} = require('../queries/Photos');
const { checkFirebaseToken } = require('../middleware/auth');

photosRouter.get('/', checkFirebaseToken, getAllPhotos);
photosRouter.get('/profile/:poster_id', checkFirebaseToken, getPhotosByUser);
// photosRouter.get('/feed', getPhotosByFriends);
photosRouter.get('/:id', getOnePhoto);
photosRouter.post('/', checkFirebaseToken, addNewPhoto);
photosRouter.delete('/:id', deletePhoto);
photosRouter.get('/hashtag/tag/:hashtag', getPhotosByHashtag);
photosRouter.get('/hashtag/all', getAllHashtags);
photosRouter.get('/hashtag/id/:photo_id', getHashtagsByPhoto);
photosRouter.post('/hashtag/', addNewHashtag);
photosRouter.get('/comments/:photo_id', checkFirebaseToken, getCommentsByPhoto);
photosRouter.post('/comments', addNewComment);
photosRouter.delete('/comment/:id', deleteComment);
photosRouter.patch('/edit/:id', editCaption);

module.exports = photosRouter;