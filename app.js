const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const createError = require('http-errors');
var cors = require('cors');



const fs = require('fs');

require('dotenv').config();



const { error, success } = require('./utils/responseHandler');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const feedRouter=require('./routes/feed');
const commentRouter=require('./routes/comment');
const Feed = require('./models/Feed');
const like = require('./routes/likes');

mongoose.connect(process.env.DB_STRING);


const app = express();



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images',express.static(path.join(__dirname, 'public')));
app.use((_, res, next) => {
    res.success = success.bind(res);
    res.error = error.bind(res);
    next();
});

app.use('/api', indexRouter);
app.use('/api', usersRouter);
app.use('/api',feedRouter);
app.use('/api',commentRouter);
app.use('/api',like);


app.use((req, res, next) => {
    return next(createError(404));
});

app.use((err, req, res, next) => {
    const statusCode = err.code || err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.error(message, statusCode);
});

module.exports = app;
