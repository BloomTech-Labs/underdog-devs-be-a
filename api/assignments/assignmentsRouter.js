const express = require('express');
// const authRequired = require('../middleware/authRequired');

const Assignment = require('./assignmentsModel');
const Profiles = require('../profile/profileModel');
const router = express.Router();
const jwt = require('jwt-decode');

//get all assignments

router.get('/', (req, res) => {
  Assignment.findAll()
    .then((applications) => {
      res.status(200).json(applications);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// get assignment by assignment id

router.get('/:id', validAssignID, (req, res) => {
  const id = req.params.id;
  Assignment.findById(id)
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// get all the mentees a mentor has by the mentor's id

router.get('/mentor/:id', validProfileID, (req, res) => {
  const id = String(req.params.id);
  Assignment.findByMentorId(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res
          .status(404)
          .json({ error: 'Assignment Not Found, Check mentor ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// get all the mentors a mentee has by the mentee's id

router.get('/mentee/:id', validProfileID, (req, res) => {
  const id = String(req.params.id);
  Assignment.findByMenteeId(id)
    .then((profile) => {
      if (profile !== null) {
        res.status(200).json(profile);
      } else {
        res
          .status(404)
          .json({ error: 'Assignment Not Found, Check mentor ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get current users mentors
router.get('/mymentors', validProfileID, (req, res) => {
  const token = req.headers.authorization;
  const User = jwt(token);
  Assignment.findByMenteeId(User.sub)
    .then((profile) => {
      if (profile !== null) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ error: 'Assignment Not Found, Check ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get current users mentees
router.get('/mymentees', validProfileID, (req, res) => {
  const token = req.headers.authorization;
  const User = jwt(token);
  Assignment.findByMentorId(User.sub)
    .then((profile) => {
      if (profile !== null) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ error: 'Assignment Not Found, Check ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// create a new assignment between a mentor and mentee
router.post('/', validNewAssign, (req, res) => {
  const assignment = {
    mentee_id: req.body.mentee_id,
    mentor_id: req.body.mentor_id,
  };
  Assignment.Add(assignment)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'this message will pop up',
      });
    });
});

// update a assignment by assignment id, must be real mentee/mentor id
router.put('/:id', validAssignID, (req, res, next) => {
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
});

//delete Assignment by assignment_id

router.delete('/:id', validAssignID, (req, res, next) => {
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
});

// Validate the Assignment_id Middleware
function validAssignID(req, res, next) {
  Assignment.findById(req.params.id)
    .then((assignment) => {
      if (assignment) {
        req.assignment = assignment;
        next();
      } else {
        res.status(400).json({
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
        res.status(400).json({
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
    res.status(400).json({
      message: 'Missing mentor_id field',
    });
  } else if (!assign.mentee_id) {
    res.status(400).json({
      message: 'Missing mentee_id field',
    });
  } else {
    next();
  }
}

module.exports = router;
