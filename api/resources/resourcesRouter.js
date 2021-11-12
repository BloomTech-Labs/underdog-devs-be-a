const express = require('express');
const Resources = require('./resourcesModel');
// const Profiles = require('../profile/profileModel');
const router = express.Router();
// const jwt = require('jwt-decode');
// const authRequired = require('../middleware/authRequired');

router.get('/', (req, res) => {
  Resources.findAll()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
