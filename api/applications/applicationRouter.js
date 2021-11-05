const express = require('express');
const authRequired = require('../middleware/authRequired');
const Application = require('./applicationModel');
const router = express.Router();
const jwt = require('jwt-decode');

router.post('/', authRequired, function (req, res, next) {
  const token = req.headers.authorization;
  const User = jwt(token);
  const newApplication = req.body;
  Application.add(User.sub, newApplication)
    .then(() => {
      res.status(201).json({ message: 'Application has been submitted' });
    })
    .catch(next);
});

module.exports = router;