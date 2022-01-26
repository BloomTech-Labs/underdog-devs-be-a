const express = require('express');
const router = express.Router();
const RoleTickets = require('./roleTicketsModel');

const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired');

// Responds with all available role ticket requests
router.get('/', authRequired, adminRequired, (req, res, next) => {
  RoleTickets.findAllRoleTickets()
    .then((roleTickets) => {
      res.status(200).json(roleTickets);
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
