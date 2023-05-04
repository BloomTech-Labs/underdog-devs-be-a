const express = require('express');
const router = express.Router();
const Progression = require('./progressionModel');
const {
  checkIfMentee,
  checkMenteeProgress,
  validateProgressId,
} = require('./progressionMiddleware');
const { validateUser } = require('../middleware/validationMiddleware');
const {
  mentorRequired,
  adminRequired,
} = require('../middleware/permissionsRequired');

// Responds with the available progression labels
router.get('/', mentorRequired, (req, res, next) => {
  Progression.findAllLabels()
    .then((labels) => {
      res.status(200).json(labels);
    })
    .catch((err) => {
      next({
        status: 500,
        message: err.message,
      });
    });
});

// Responds with a mentee's current progress.
router.get(
  '/:profile_id',
  mentorRequired,
  validateUser,
  checkIfMentee,
  async (req, res, next) => {
    const { profile_id } = req.params;
    try {
      const data = await Progression.findByMenteeId(profile_id);
      res.status(200).json(data);
    } catch (err) {
      next({
        status: 500,
        message: err.message,
      });
    }
  }
);

// allows an admin to update a mentee's progress
router.put(
  '/:profile_id',
  adminRequired,
  validateUser,
  validateProgressId,
  checkIfMentee,
  checkMenteeProgress,
  async (req, res, next) => {
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
      next({
        status: 500,
        message: err.message,
      });
    }
  }
);

module.exports = router;
