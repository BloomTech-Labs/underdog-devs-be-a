const express = require('express');
const Review = require('./reviewsModel');
const Profiles = require('../profile/profileModel');
const router = express.Router();
const { adminRequired } = require('../middleware/permissionsRequired');
const authRequired = require('../middleware/authRequired');

//Get all reviews

router.get('/', authRequired, adminRequired, (req, res) => {
  Review.findAll()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

//Get all reviews by mentor's id

router.get('/mentor/:id', authRequired, validProfileID, (req, res) => {
  const id = req.params.id;
  Review.findByMentorId(id)
    .then((reviews) => {
      if (reviews) {
        res.status(200).json(reviews);
      } else {
        res.status(404).json({ error: 'Reviews Not Found, Check mentor ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get all mentee reviews by mentee_id

router.get('/mentee/:id', authRequired, validProfileID, (req, res) => {
  const id = req.params.id;
  Review.findByMenteeId(id)
    .then((reviews) => {
      if (reviews) {
        res.status(200).json(reviews);
      } else {
        res.status(404).json({ error: 'Reviews Not Found, Check mentee ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Create a review for a mentee

router.post(
  '/',
  authRequired,
  validNewReview,
  adminRequired,
  (req, res, next) => {
    const review = req.body;
    Review.Create(review)
      .then(() => {
        res.status(201).json({ message: 'success' });
      })
      .catch(next);
  }
);

////////////////MIDDLEWARE////////////////

// Validate profile id

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

// Validate new review includes a mentor and mentee

function validNewReview(req, res, next) {
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
