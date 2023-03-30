const express = require('express');
const router = express.Router();
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

router.post('/read/:role', (req, res) => {
  const role = req.params.role;
  axios({
    method: 'post',
    url: `${baseURL}/read/${role}`,
    data: req.body,
  })
    .then((resp) => {
      res.status(200).json(resp.data.result);
    })
    .catch((err) => console.error(err));
});

router.post('/:role/:profile_id', (req, res) => {
  const role = req.params.role;
  const profile_id = req.params.profile_id;
  axios({
    method: 'post',
    url: `${baseURL}/${role}-match/${profile_id}`,
  })
    .then((resp) => {
      res.status(200).json(resp.data.result);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
