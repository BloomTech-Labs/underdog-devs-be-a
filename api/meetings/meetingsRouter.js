const express = require('express');
const Meeting = require('../meetings/meetingsModel');
const Profiles = require('../profile/profileModel');
const router = express.Router();
const jwt = require('jwt-decode');

// get all meetings

router.get('/', (req, res) => {
  Meeting.findAll()
    .then((meetings) => {
      res.status(200).json(meetings);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// get a meeting by meeting_id

router.get('/:meeting_id', validMeetingID, (req, res) => {
  const id = req.params.meeting_id;
  Meeting.findByMeetingId(id)
    .then((meeting) => {
      res.status(200).json(meeting);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// get all the meetings a profile_id has scheduled

router.get('/profile/:profile_id', validProfileID, (req, res) => {
  const id = req.params.profile_id;
  Meeting.findByProfileId(id)
    .then((meetings) => {
      if (meetings) {
        res.status(200).json(meetings);
      } else {
        res.status(404).json({ error: 'Meetings not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// get all the meetings the current user has
router.get('/my-meetings', (req, res) => {
  const token = req.headers.authorization;
  const User = jwt(token);
  Meeting.findByProfileId(User.sub)
    .then((meetings) => {
      res.status(200).json(meetings);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//create a meeting

//update a meeting

//delete a meeting

//////////////////////////////////////////////////////////////////////////////////////////////

//validate meeting_id middleware

function validMeetingID(req, res, next) {
  Meeting.findByMeetingId(req.params.meeting_id).then((meeting) => {
    if (meeting) {
      req.meeting = meeting;
      next();
    } else {
      res.status(400).json({
        message: 'Meeting_id Not Found',
      });
    }
  });
}

//validate the profile_id

function validProfileID(req, res, next) {
  Profiles.findById(req.params.profile_id)
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

// validates a new meeting to include all required fields

// function validNewMeeting(req, res, next) {
//   const meeting = req.body;
//   if (!meeting) {
//     res.status(400).json({
//       message: 'Missing Meeting Data',
//     });
//   } else if (!meeting.mentor_id) {
//     res.status(400).json({
//       message: 'Missing mentor_id field',
//     });
//   } else if (!meeting.mentee_id) {
//     res.status(400).json({
//       message: 'Missing mentee_id field',
//     });
//   } else {
//     next();
//   }
// }

module.exports = router;
