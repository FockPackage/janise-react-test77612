const express = require('express');
// const config = require('../../config');

const router = new express.Router();

router.get('/control', (req, res) => {
  const data = req.query;
  console.log(data);

  if (data.action === 'login') {
    req.app.socket.emit('login', data);
    res.send(data);
  }
  if (data.action === 'logout') {
    req.app.socket.emit('logout', data);
    res.send(data);
  }
  if (data.action === 'setindex') {
    req.app.socket.emit('setIndex', data);
    res.send(data);
  }
});

module.exports = router;
