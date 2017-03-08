const express = require('express');

const router = new express.Router();
const env = process.env.NODE_ENV || 'development';
var url = '';

router.get('/*', (req, res) => {
  console.log(env);
  if (env !== 'production') {
    url = 'http://localhost:35729/livereload.js';
  }
  console.log(url);
  res.render('index', { title: '上海电信领导视窗大屏', livereloadUrl: url });
});

module.exports = router;
