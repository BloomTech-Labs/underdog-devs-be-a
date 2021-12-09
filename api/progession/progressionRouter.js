const express = require('express');
const router = express.Router();
const Progression = require('./progressionModel');
const checkIfMentee = require('./progressionMiddleware');
const { mentorRequired } = require('../middleware/permissionsRequired');

// Responds with a mentee's current progress.
router.get('/:profile_id', mentorRequired, checkIfMentee, (req, res) => {
  const { profile_id } = req.params;
  Progression.findByMenteeId(profile_id)
    .then((progress) => {
      if (progress) {
        res.status(200).json({ progress: progress.progress_id });
      } else {
        res.status(404).json({ error: 'Mentee not found, check profile ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
