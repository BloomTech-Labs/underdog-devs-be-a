const express = require('express');
const router = express.Router();
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

router.post('/graph/tech', (req, res) => {
  if (req.body.theme === 'dark') {
    axios
      .get(`${baseURL}/graph/tech-stack-by-role`)
      .then((resp) => {
        res.status(200).send(resp.data);
      })
      .catch((err) => console.error(err));
  } else if (req.body.theme === 'light') {
    axios
      .get(`${baseURL}/graph/tech-stack-by-role?dark=false`)
      .then((resp) => {
        res.status(200).send(resp.data);
      })
      .catch((err) => console.error(err));
  }
});

module.exports = router;
