const express = require('express');
const router = express.Router();
const Roles = require('./rolesModel');
const authRequired = require('../middleware/authRequired');

router.get('/:id', authRequired, (req, res) => {
  const { id } = req.params.id;
  Roles.findByProfileId(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile.role_id);
      } else {
        res.status(404).json({ error: 'Profile not found, check ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
