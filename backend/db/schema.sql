-- DROP DATABASE IF EXISTS my_ig_db;
-- CREATE DATABASE my_ig_db;

-- \c my_ig_db;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Photos CASCADE;
DROP TABLE IF EXISTS Comments CASCADE;
DROP TABLE IF EXISTS Likes CASCADE;
DROP TABLE IF EXISTS Hashtags CASCADE;

CREATE TABLE Users (
    id VARCHAR PRIMARY KEY,
    username VARCHAR UNIQUE,
    password TEXT,
    full_name TEXT,
    bio TEXT,
    avatar VARCHAR,
    email TEXT UNIQUE
);

CREATE TABLE Photos (
    id SERIAL PRIMARY KEY,
    poster_id VARCHAR REFERENCES Users(id) ON DELETE CASCADE,
    imageURL VARCHAR,
    caption TEXT,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    commenter_name VARCHAR REFERENCES Users(username) ON DELETE CASCADE,
    photo_id INT REFERENCES Photos(id) ON DELETE CASCADE,
    comment TEXT,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Likes (
    id SERIAL PRIMARY KEY,
    liker_id VARCHAR REFERENCES Users(id),
    photo_id  INT REFERENCES Photos(id),
    CONSTRAINT UC_like UNIQUE (liker_id, photo_id)
);

CREATE TABLE Hashtags (
    id SERIAL PRIMARY KEY,
    tagger_id VARCHAR REFERENCES Users(id),
    photo_id  INT REFERENCES Photos(id),
    tag_name TEXT
);