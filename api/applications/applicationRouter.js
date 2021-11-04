const express = require('express');
const authRequired = require('../middleware/authRequired');
const Application = require('./applicationModel');
const router = express.Router();
const jwt = require('jsonwebtoken');

// File created to prevent merge conflicts
// This is meant to handle receiving applications for mentor or mentee

router.post('/', authRequired, function (req, res, next) {
  const token = req.headers.authorization;
  const User = jwt.decode(token);
  const newApplication = req.body;
  Application.add(User.sub, newApplication)
    .then((addedApplication) => {
      res.status(201).json(addedApplication);
    })
    .catch(next);
});

module.exports = router;
