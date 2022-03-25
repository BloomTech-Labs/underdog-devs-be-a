const express = require('express');
const Review = require('./reviewsModel');
const Profiles = require('../profile/profileModel');
const router = express.Router();
const { adminRequired } = require('../middleware/permissionsRequired');
const authRequired = require('../middleware/authRequired');

//Get all reviews

router.get('/', authRequired, adminRequired, (req, res, next) => {
  Review.findAll()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

//Get all reviews by mentor's id

router.get('/mentor/:id', authRequired, validProfileID, (req, res, next) => {
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

router.get('/mentee/:id', authRequired, validProfileID, (req, res, next) => {
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

module.exports = router;
