const express = require('express');
const router = express.Router();
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

router.get('/graph/tech', (req, res) => {
  console.log(`Hello from ENDPOINT`, baseURL);
  axios
    .get(`${baseURL}/graph/tech-stack-by-role`)
    .then((resp) => {
      res.status(200).send(resp.data);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
