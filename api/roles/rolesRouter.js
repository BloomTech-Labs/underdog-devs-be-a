const express = require('express');
const router = express.Router();
const Roles = require('./rolesModel');

const { validateUser } = require('../middleware/generalMiddleware');
const { validateRoleId, checkCurrentRoleId } = require('./rolesMiddleware');
const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired');

// Responds with all available roles
router.get('/', authRequired, adminRequired, (req, res) => {
  Roles.findAllRoles()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// gets a profile's role_id
router.get(
  '/:profile_id',
  authRequired,
  adminRequired,
  validateUser,
  async (req, res) => {
    const { profile_id } = req.params;
    try {
      const data = await Roles.findByProfileId(profile_id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;

// allows an admin to change a profile's role_id to any role but super admin
router.put(
  '/:profile_id',
  authRequired,
  adminRequired,
  validateUser,
  validateRoleId,
  checkCurrentRoleId,
  async (req, res) => {
    const { profile_id } = req.params;
    const { role_id } = req.body;
    try {
      const data = await Roles.updateProfileRoleId(profile_id, role_id);
      data.message = "Profile's role has been successfully updated";
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);
