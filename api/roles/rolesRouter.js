const express = require('express');
const router = express.Router();
const Roles = require('./rolesModel');

const { validateUser } = require('../middleware/validationMiddleware');
const { validateRoleId, checkCurrentRoleId } = require('./rolesMiddleware');
const { adminRequired } = require('../middleware/permissionsRequired');

// Responds with all available roles
router.get('/', adminRequired, (req, res, next) => {
  Roles.findAllRoles()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

// gets a profile's role_id
router.get('/:profile_id', validateUser, (req, res, next) => {
  const { profile_id } = req.params;
  Roles.findByProfileId(profile_id)
    .then((profile) => {
      if (profile) {
        res.status(200).json({ role_id: profile.role_id });
      } else {
        next({ status: 404, message: 'Profile not found, check ID' });
      }
    })
    .catch((err) => {
      next({ status: 500, message: err.message });
    });
});

// allows an admin to change a profile's role_id to any role but super admin
router.put(
  '/:profile_id',
  adminRequired,
  validateUser,
  validateRoleId,
  checkCurrentRoleId,
  async (req, res, next) => {
    const { profile_id } = req.params;
    const { role_id } = req.body;
    try {
      const data = await Roles.updateProfileRoleId(profile_id, role_id);
      data.message = "Profile's role has been successfully updated";
      res.status(200).json(data);
    } catch (err) {
      next({ status: 500, message: err.message });
    }
  }
);

module.exports = router;
