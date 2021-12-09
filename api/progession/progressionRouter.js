const express = require('express');
const router = express.Router();
const Progression = require('./progressionModel');
const checkIfMentee = require('./progressionMiddleware');

router.get('/:profile_id', checkIfMentee, (req, res) => {
  const { profile_id } = req.params;
  Progression.findByMenteeId(profile_id)
    .then((mentee) => {
      if (mentee) {
        res.status(200).json({ progress: mentee.progress });
      } else {
        res.status(404).json({ error: 'Mentee not found, check profile ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
