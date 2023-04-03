const express = require('express');
const router = express.Router();
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

// profile objects
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

// suggested matches
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

// update matches
router.patch('/update/:role/:profileID/', (req, res) => {
  const profile_id = req.params.profileID;
  const role = req.params.role;
  const newArray = req.body;
  axios({
    method: 'patch',
    url: `${baseURL}/update/${role}/${profile_id}`,
    data: {
      matches: newArray,
    },
  })
    .then((resp) => {
      res.status(200).json(resp.response);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
