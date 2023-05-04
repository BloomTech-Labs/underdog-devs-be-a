const express = require('express');
const Review = require('./reviewsModel');
const Profiles = require('../profile/profileModel');
const router = express.Router();
const { adminRequired } = require('../middleware/permissionsRequired');

//Get all reviews

router.get('/', adminRequired, (req, res, next) => {
  Review.findAll()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

//Get all reviews by mentor's id

router.get('/mentor/:id', validProfileID, (req, res, next) => {
  const id = req.params.id;
  Review.findByMentorId(id)
    .then((reviews) => {
      if (reviews) {
        res.status(200).json(reviews);
      } else {
        next({ status: 404, message: 'Reviews Not Found, Check mentor ID' });
      }
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

//get all mentee reviews by mentee_id

router.get('/mentee/:id', validProfileID, (req, res, next) => {
  const id = req.params.id;
  Review.findByMenteeId(id)
    .then((reviews) => {
      if (reviews) {
        res.status(200).json(reviews);
      } else {
        next({ status: 404, message: 'Reviews Not Found, Check mentee ID' });
      }
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

// Create a review for a mentee

router.post('/', validNewReview, adminRequired, (req, res, next) => {
  const review = req.body;
  Review.Create(review)
    .then(() => {
      res.status(201).json({ message: 'success' });
    })
    .catch(next);
});

// Create a review for a mentor

router.post('/', validNewReview, (req, res, next) => {
  const review = req.body;
  Review.Create(review)
    .then(() => {
      res.status(201).json({ message: 'success' });
    })
    .catch(next);
});

////////////////MIDDLEWARE////////////////

// Validate profile id

function validProfileID(req, res, next) {
  Profiles.findById(req.params.id)
    .then((profile) => {
      if (profile) {
        req.profile = profile;
        next();
      } else {
        next({
          status: 400,
          message: 'Invalid Profile ID',
        });
      }
    })
    .catch(next);
}

// Validate new review includes a mentor_id and mentee_id

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
