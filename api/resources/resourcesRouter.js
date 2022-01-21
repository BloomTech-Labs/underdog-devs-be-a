const express = require('express');
const router = express.Router();
const Resources = require('./resourcesModel');
const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired');
const { validateResource } = require('../middleware/resourcesMiddleware');

//get all resources

router.get('/', authRequired, (req, res) => {
  Resources.findAll()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// get a resource by its id

router.get('/:resource_id', authRequired, (req, res) => {
  const id = req.params.resource_id;
  Resources.findByResourceId(id)
    .then((resource) => {
      if (resource) {
        res.status(200).json(resource);
      } else {
        res.status(404).json({ error: 'Resource not found, check the ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// add a resource to the resources database

router.post(
  '/',
  authRequired,
  adminRequired,
  validateResource,
  async (req, res, next) => {
    try {
      const resourceInput = req._resource;
      const postResponse = await Resources.Create(resourceInput);
      res.status(201).json({
        message: 'new resource created, successfully!',
        resource: postResponse,
      });
    } catch (err) {
      return next(err);
    }
  }
);

//update a resource

router.put(
  '/:resource_id',
  authRequired,
  adminRequired,
  validateResource,
  (req, res, next) => {
    const id = req.params.resource_id;
    const changes = req.body;
    Resources.Update(id, changes)
      .then((change) => {
        if (change) {
          Resources.findByResourceId(id).then((success) => {
            res.status(200).json({
              message: `Resource '${success.resource_id}' updated`,
              success,
            });
          });
        }
      })
      .catch(next);
  }
);

//delete a resource

router.delete(
  '/:resource_id',
  authRequired,
  adminRequired,
  (req, res, next) => {
    const id = req.params.resource_id;
    Resources.Delete(id)
      .then((resources) => {
        if (resources) {
          res.status(200).json({
            message: 'Resource deleted',
          });
        }
      })
      .catch(next);
  }
);

module.exports = router;
