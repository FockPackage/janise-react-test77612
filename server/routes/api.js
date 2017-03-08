const express = require('express');
const request = require('request');
const config = require('../../config');

const router = new express.Router();

// const env = process.env.NODE_ENV || 'development';
// 各业务指标月数据
router.post('/queryMonthData.do', (req, res) => {
  const url = `${config.serverUrl}/queryMonthData.do`;

  request.post(url, { form: req.body }, (err, response, body) => {
    if (err) {
      console.log(err);
    }
    // console.log(body);
    res.send(body);
  });
});

// 各业务指标年数据
router.post('/queryYearData.do', (req, res) => {
  const url = `${config.serverUrl}/queryYearData.do`;
  request.post(url, { form: req.body }, (err, response, body) => {
    if (err) {
      console.log(err);
    }
    // console.log(body);
    res.send(body);
  });
});

// 用户认证接口
router.post('/queryDimIndexUser.do', (req, res) => {
  const url = `${config.serverUrl}/queryDimIndexUser.do`;
  request.post(url, { form: req.body }, (err, response, body) => {
    if (err) {
      console.log(err);
    }
    // console.log(body);
    res.send(body);
  });
});

// 业务指标查询接口
router.post('/insertQueryLog.do', (req, res) => {
  const url = `${config.serverUrl}/insertQueryLog.do`;
  request.post(url, { form: req.body }, (err, response, body) => {
    if (err) {
      console.log(err);
    }
    // console.log(body);
    res.send(body);
  });
});

// 资料查询接口
router.post('/getDocumentInfo.do', (req, res) => {
  const url = `${config.serverUrl}//documentInfo/getDocumentInfo.do`;
  request.post(url, { form: req.body }, (err, response, body) => {
    if (err) {
      console.log(err);
    }
    // console.log(body);
    res.send(body);
  });
});

module.exports = router;
