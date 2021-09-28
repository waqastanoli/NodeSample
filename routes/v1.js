var express = require('express');
var app = express();
var user = require('../routes/v1/user');
var post = require('../routes/v1/post');

app.use('/user', user);
app.use('/post', post);

module.exports = app;