const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
// const { checkFirebaseToken } = require('./middleware/auth');
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// const port = 3005; 

const usersRouter = require('./routes/Users');
// const photosRouter = require('./routes/Photos');
// const hashtagsRouter = require('./routes/Hashtags/Hashtags')
// const uploadRouter = require('./routes/Uploads/Uploads');
// const likesRouter = require('./routes/Likes/Likes');


app.use('/users', usersRouter);
// app.use('/photos', photosRouter);
// app.use('/hashtags', hashtagsRouter);
// app.use('/posts/uploads', uploadRouter)
// app.use('/likes', likesRouter);

app.use((err, req, res, next) => {
    console.log(err);
    if(err.status) {
        res.status(err.status).json(err);
    } else {
        res.status(500).json(err);
    }
})

app.listen(PORT, () => {
    console.log('Listening to port ' + PORT);
});