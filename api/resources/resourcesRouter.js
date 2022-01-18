const express = require('express');
const router = express.Router();
const Resources = require('./resourcesModel');
const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired');
const { validateResource } = require('../middleware/resourcesMiddleware');

/**
 * @swagger
 * components:
 *  schemas:
 *    Resource:
 *      type: object
 *      required:
 *        - resource_id
 *        - resource_name
 *        - category
 *        - condition
 *        - assigned
 *      properties:
 *        resource_id:
 *          type: integer
 *          description: Primary key referencing a resource's auto-assigned ID
 *        resource_name:
 *          type: string
 *          description: The name of a resource
 *        category:
 *          type: string
 *          description: The name of the category the resource belongs to
 *        condition:
 *          type: string
 *          description: An evaluation of the resource's current condition
 *        assigned:
 *          type: boolean
 *          description: State of whether or not a resource is assigned to someone already
 *        current_assignee:
 *          type: string
 *          description: Foreign key referencing the profile_id of the current assignee
 *        previous_assignee:
 *          type: string
 *          description: Foreign key referencing the profile_id of the previous assignee
 *        monetary_value:
 *          type: string
 *          description: The approximate price/value of the resource
 *        deductible_donation:
 *          type: boolean
 *          description: State of whether or not a resource is a deductible donation
 *      example:
 *        resource_id: 1
 *        created_at: "2021-11-12T19:50:44.914Z"
 *        updated_at: "2021-11-12T19:50:44.914Z"
 *        resource_name: "MacBook Pro 2020"
 *        category: "Computers"
 *        condition: "Excellent"
 *        assigned: true
 *        current_assignee: "9"
 *        previous_assignee: "7"
 *        monetary_value: "$1000"
 *        deductible_donation: true
 */

// get all resources
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
