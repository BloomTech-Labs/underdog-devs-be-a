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

router.post(
  '/',
  validNewMeeting,
  validHostID,
  validAtendeeID,
  (req, res, next) => {
    const meeting = req.body;
    Meeting.Create(meeting)
      .then(() => {
        res.status(201).json({ message: 'success' });
      })
      .catch(next);
  }
);

//update a meeting

router.put(
  '/:meeting_id',
  validMeetingID,
  validNewMeeting,
  (req, res, next) => {
    const id = req.params.meeting_id;
    const changes = req.body;
    Meeting.Update(id, changes)
      .then((change) => {
        if (change) {
          Meeting.findByMeetingId(id).then((success) => {
            res.status(200).json({
              message: `Meeting '${success.meeting_id}' updated`,
              success,
            });
          });
        }
      })
      .catch(next);
  }
);

//delete a meeting

router.delete('/:meeting_id', validMeetingID, (req, res, next) => {
  const id = req.params.meeting_id;
  Meeting.Remove(id)
    .then((meeting) => {
      if (meeting) {
        res.status(200).json({
          message: 'Meeting deleted',
        });
      }
    })
    .catch(next);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

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

//host_id must have a valid profile_id

function validHostID(req, res, next) {
  Profiles.findById(req.body.host_id)
    .then((profile) => {
      if (profile) {
        req.profile = profile;
        next();
      } else {
        res.status(400).json({
          message: 'Invalid Host ID',
        });
      }
    })
    .catch(next);
}

//attendee_id must have a valid profile_id

function validAtendeeID(req, res, next) {
  Profiles.findById(req.body.attendee_id)
    .then((profile) => {
      if (profile) {
        req.profile = profile;
        next();
      } else {
        res.status(400).json({
          message: 'Invalid attendee_id',
        });
      }
    })
    .catch(next);
}

// validates a new meeting to include all required fields,has to be real profile_id for host and attendee_id

function validNewMeeting(req, res, next) {
  const meeting = req.body;
  if (!meeting) {
    res.status(400).json({
      message: 'Missing Meeting Data',
    });
  } else if (!meeting.meeting_topic) {
    res.status(400).json({
      message: 'Missing meeting_topic field',
    });
  } else if (!meeting.meeting_date) {
    res.status(400).json({
      message: 'Missing meeting_date field',
    });
  } else if (!meeting.meeting_time) {
    res.status(400).json({
      message: 'Missing meeting_time field',
    });
  } else if (!meeting.host_id) {
    res.status(400).json({
      message: 'Missing host_id field',
    });
  } else if (!meeting.attendee_id) {
    res.status(400).json({
      message: 'Missing attendee_id field',
    });
  } else {
    next();
  }
}

module.exports = router;
