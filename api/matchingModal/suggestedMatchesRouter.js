const express = require('express');
const router = express.Router();
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

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
