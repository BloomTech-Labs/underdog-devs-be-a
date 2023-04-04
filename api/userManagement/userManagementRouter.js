const express = require('express');
const router = express.Router();
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

router.post('/read/:role', (req, res) => {
  const role = req.params.role;
  axios({
    method: 'post',
    url: `${baseURL}/read/${role}`,
    data: {},
  })
    .then((resp) => {
      res.status(200).json(resp.data.result);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
