const express = require('express');
const router = express.Router();
const Progression = require('./progressionModel');

router.get('/:profile_id', (req, res) => {
  const id = req.params.profile_id;
  Progression.findByMenteeId(id)
    .then((mentee) => {
      if (mentee) {
        res.status(200).json({ "mentee's progress": mentee.progress });
      } else {
        res.status(404).json({ error: 'Mentee not found, check profile ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
