const express = require('express');
const authRequired = require('../middleware/authRequired');
const Application = require('./applicationModel');
const Profile = require('../profile/profileModel');
const router = express.Router();
const jwt = require('jwt-decode');

router.get('/', (req, res, next) => {
  Application.getPendingTickets()
    .then((applicationList) => {
      res.status(200).json(applicationList);
    })
    .catch(next);
});

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

router.put('/', function (req, res, next) {
  const profile_id = req.body.profile_id;
  const application_id = req.body.application_id;
  const role_id = req.body.position;
  Profile.update(profile_id, { role_id: role_id })
    .then(() => {
      res.status(202).json({ message: 'User role has been updated' });
    })
    .catch(next);
  Application.update(application_id, { approved: true })
    .then(() => {
      res.status(202).json({ message: 'This application has been approved' });
    })
    .catch(next);
});

module.exports = router;
