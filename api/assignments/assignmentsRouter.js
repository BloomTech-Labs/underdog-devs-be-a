const express = require('express');
const Assignment = require('./assignmentsModel');
const router = express.Router();
const { adminRequired } = require('../middleware/permissionsRequired');
const authRequired = require('../middleware/authRequired');
const axios = require('axios');
const baseURL = require('../../config/dsConfig');

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

router.get('/:profile_id', authRequired, (req, res, next) => {
  const { profile_id } = req.params;
  const { role } = req.body;
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
    .catch(next);
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
