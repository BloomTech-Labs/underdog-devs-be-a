const express = require('express');
const Resources = require('./resourcesModel');
// const Profiles = require('../profile/profileModel');
const router = express.Router();
// const jwt = require('jwt-decode');
const authRequired = require('../middleware/authRequired');

//get all resources

router.get('/', (req, res) => {
  Resources.findAll()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// get a resource by its id

router.get('/:resource_id', authRequired, (req, res) => {
  const id = req.params.resource_id;
  Resources.findByResourceId(id)
    .then((resource) => {
      if (resource) {
        res.status(200).json(resource);
      } else {
        res.status(404).json({ error: 'Resource not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
