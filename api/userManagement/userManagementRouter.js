const express = require('express');
const router = express.Router();
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

router.get('/get/all', (req, res) => {
  axios
    .get(`${baseURL}/get/all`)
    .then((resp) => {
      res.status(200).json(resp.data);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
