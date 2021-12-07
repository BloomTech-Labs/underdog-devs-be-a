const express = require('express');
const router = express.Router();
const Roles = require('./rolesModel');

// gets a profile's role id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Roles.findByProfileId(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json({ role_id: profile.role_id });
      } else {
        res.status(404).json({ error: 'Profile not found, check ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
