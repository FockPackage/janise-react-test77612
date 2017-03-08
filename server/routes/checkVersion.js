const express = require('express');
const router = new express.Router();

router.get('/check',(req, res) => {
  const version = '1.0.11';
  const myVersion = + version.replace(/\./g, '');
  const v = req.query.version;
  const myV = + v.replace(/\./g, '');

  console.log(v);

  if( myV < myVersion) {
    console.log("update");
    res.send({
      url: `${version}`,
      message: 'please to update your app',
      code: 0,
    })
  } else {
    console.log("isNew");
    res.send({
      code: 1,
      message: 'your app is new version',
    })
  }
})

module.exports = router;
