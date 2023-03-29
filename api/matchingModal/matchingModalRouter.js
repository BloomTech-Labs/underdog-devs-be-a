const express = require('express');
const router = express.Router();
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

router.post('/read/mentor', (req, res) => {
  axios({
    method: 'post',
    url: `${baseURL}/read/mentor`,
    data: req.body,
  })
    .then((resp) => {
      res.status(200).json(resp.data.result);
    })
    .catch((err) => console.error(err));
});

router.post('/read/mentee', (req, res) => {
  axios({
    method: 'post',
    url: `${baseURL}/read/mentee`,
    data: req.body,
  })
    .then((resp) => {
      res.status(200).json(resp.data.result);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
