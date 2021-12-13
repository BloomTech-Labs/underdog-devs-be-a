const express = require('express');
const router = express.Router();
const Progression = require('./progressionModel');
const {
  checkIfMentee,
  checkMenteeProgress,
  validateUser,
  validateProgressId,
} = require('./progressionMiddleware');
// const { mentorRequired } = require('../middleware/permissionsRequired');

// Responds with the available progression labels
router.get('/', (req, res) => {
  Progression.findAllLabels()
    .then((labels) => {
      res.status(200).json(labels);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// Responds with a mentee's current progress.
router.get('/:profile_id', validateUser, checkIfMentee, async (req, res) => {
  const { profile_id } = req.params;
  try {
    const mentee = await Progression.findByMenteeId(profile_id);
    res.status(200).json({ progress: mentee.progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// allows an admin to update a mentee's progress
router.put(
  '/:profile_id',
  validateUser,
  validateProgressId,
  checkIfMentee,
  checkMenteeProgress,
  async (req, res) => {
    const { profile_id } = req.params;
    const { progress_id } = req.body;
    try {
      const data = await Progression.updateMenteeProgress(
        profile_id,
        progress_id
      );
      data.message = 'Mentee progress successfully updated';
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
