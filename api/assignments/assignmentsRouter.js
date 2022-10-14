const express = require('express');
const Assignment = require('./assignmentsModel');
const router = express.Router();
const { adminRequired } = require('../middleware/permissionsRequired');
const authRequired = require('../middleware/authRequired');
const axios = require('axios');
const { baseURL } = require('../../config/dsConfig');

// possible endpoint for admin use case of retrieving all matches / assignments (needs to be refactored to point to DS API instead of Postgres BE)

router.get('/', authRequired, adminRequired, (req, res, next) => {
  Assignment.findAll()
    .then((assignments) => {
      res.status(200).json(assignments);
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

// get all assignments by profile ID

router.get('/:role/:profile_id', (req, res, next) => {
  const { role, profile_id } = req.params;
  const payload = {
    user_id: profile_id,
    user_type: role,
  };
  axios
    .post(`${baseURL}/read/match`, payload)
    .then((dsRes) => {
      const results = dsRes.data[role === 'mentor' ? 'mentee' : 'mentor'];
      res.json(results);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
