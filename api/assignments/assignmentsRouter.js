const express = require('express');
const Assignment = require('./assignmentsModel');
const Profiles = require('../profile/profileModel');
const router = express.Router();
const jwt = require('jwt-decode');
const { adminRequired } = require('../middleware/permissionsRequired');
const authRequired = require('../middleware/authRequired');
const axios = require('axios');
const baseURL = require('../../config/dsConfig');

// get all assignments for current user

router.get('/', authRequired, (req, res, next) => {
  const { profile_id, role } = req.body;
  const payload = {
    id: profile_id,
    type: role,
  };
  axios
    .post(`${baseURL}/assignment`, payload)
    .then((dsRes) => {
      const results = dsRes.data[role === 'mentor' ? 'mentee' : 'mentor'];
      res.json(results);
    })
    .catch(next);
});

// get all the mentees a mentor has by the mentor's id

router.get(
  '/mentor/:id',
  authRequired,
  validProfileID,
  adminRequired,
  (req, res, next) => {
    const id = req.params.id;
    Assignment.findByMentorId(id)
      .then((mentees) => {
        if (mentees) {
          res.status(200).json(mentees);
        } else {
          res
            .status(404)
            .json({ error: 'Assignment Not Found, Check mentor ID' });
        }
      })
      .catch((err) => {
        next({ status: 500, message: err.message });
      });
  }
);

// get all the mentors a mentee has by the mentee's id

router.get(
  '/mentee/:id',
  authRequired,
  validProfileID,
  adminRequired,
  (req, res, next) => {
    const id = req.params.id;
    Assignment.findByMenteeId(id)
      .then((mentors) => {
        if (mentors) {
          res.status(200).json(mentors);
        } else {
          res
            .status(404)
            .json({ error: 'Assignment Not Found, Check mentee ID' });
        }
      })
      .catch((err) => {
        next({ status: 500, message: err.message });
      });
  }
);

//get current users mentors

router.get('/mymentors', authRequired, (req, res, next) => {
  const token = req.headers.authorization;
  const User = jwt(token);
  Assignment.findByMenteeId(User.sub)
    .then((mentors) => {
      if (mentors) {
        res.status(200).json(mentors);
      } else {
        res.status(404).json({ error: 'Mentors not found' });
      }
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

//get current users mentees

router.get('/mymentees', authRequired, (req, res, next) => {
  const token = req.headers.authorization;
  const User = jwt(token);
  Assignment.findByMentorId(User.sub)
    .then((mentees) => {
      if (mentees) {
        res.status(200).json(mentees);
      } else {
        res.status(404).json({ error: 'Mentees not found' });
      }
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

// create a new assignment between a mentor and mentee

router.post(
  '/',
  authRequired,
  validNewAssign,
  adminRequired,
  (req, res, next) => {
    const assignment = req.body;
    Assignment.Create(assignment)
      .then(() => {
        res.status(201).json({ message: 'success' });
      })
      .catch(next);
  }
);

// update a assignment by assignment id, must be real mentee/mentor id

router.put(
  '/:id',
  authRequired,
  validAssignID,
  adminRequired,
  (req, res, next) => {
    const id = req.params.id;
    const changes = req.body;
    Assignment.Update(id, changes)
      .then((change) => {
        if (change === 1) {
          Assignment.findById(id).then((success) => {
            res.status(200).json({
              message: `Assignment '${success.assignment_id}' updated`,
              success,
            });
          });
        }
      })
      .catch(next);
  }
);

//delete Assignment by assignment_id

router.delete(
  '/:id',
  authRequired,
  validAssignID,
  adminRequired,
  (req, res, next) => {
    const id = req.params.id;
    Assignment.Remove(id)
      .then((assignment) => {
        if (assignment) {
          res.status(200).json({
            message: 'assignment deleted',
          });
        }
      })
      .catch(next);
  }
);

// get assignment by assignment id

router.get(
  '/:id',
  authRequired,
  validAssignID,
  adminRequired,
  (req, res, next) => {
    const id = req.params.id;
    Assignment.findById(id)
      .then((assigns) => {
        res.status(200).json(assigns);
      })
      .catch((err) => {
        next({ status: 500, message: err.message });
      });
  }
);

///////////////////////////MIDDLEWARE///////////////////////////////

// Validate the Assignment_id Middleware

function validAssignID(req, res, next) {
  Assignment.findById(req.params.id)
    .then((assignment) => {
      if (assignment) {
        req.assignment = assignment;
        next();
      } else {
        next({
          status: 404,
          message: 'Invalid assignment ID',
        });
      }
    })
    .catch(next);
}

//validate the profile_id

function validProfileID(req, res, next) {
  Profiles.findById(req.params.id)
    .then((profile) => {
      if (profile) {
        req.profile = profile;
        next();
      } else {
        next({
          status: 404,
          message: 'Invalid ID',
        });
      }
    })
    .catch(next);
}

// validate new assignment includes both mentor_id and mentee_id

function validNewAssign(req, res, next) {
  const assign = req.body;
  if (!assign) {
    res.status(400).json({
      message: 'Missing Assignment Data',
    });
  } else if (!assign.mentor_id) {
    next({
      status: 400,
      message: 'Missing mentor_id field',
    });
  } else if (!assign.mentee_id) {
    next({
      status: 400,
      message: 'Missing mentee_id field',
    });
  } else {
    next();
  }
}

module.exports = router;
