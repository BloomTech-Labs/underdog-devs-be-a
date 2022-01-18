const express = require('express');
const router = express.Router();
const Resources = require('./resourcesModel');
const authRequired = require('../middleware/authRequired');
const { adminRequired } = require('../middleware/permissionsRequired');

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

/**
 * @swagger
 * /resources:
 *  get:
 *    summary: Returns a list of resources
 *    tags:
 *      - resource
 *    responses:
 *      '200':
 *        description: A JSON array of resources (as objects) currently available for/assigned to clients
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Resource'
 *              example:
 *                - resource_id: 54
 *                  resource_name: 'Mead Composition Notebook'
 *                  category: 'Office Supplies'
 *                  condition: 'New'
 *                  assigned: false
 *                  current_assignee: null
 *                  previous_assignee: null
 *                  monetary_value: '$2'
 *                  deductible_donation: false
 *                - resource_id: 27
 *                  resource_name: 'Lenovo Chromebook S330'
 *                  category: 'Computers'
 *                  condition: 'New'
 *                  assigned: true
 *                  current_assignee: Rueben Andrews
 *                  previous_assignee: Hunter Phillips
 *                  monetary_value: '$250'
 *                  deductible_donation: true
 *                - resource_id: 33
 *                  resource_name: 'Sharpie Pens (Black), 12pcs'
 *                  category: 'Office Supplies'
 *                  condition: 'New'
 *                  assigned: false
 *                  current_assignee: null
 *                  previous_assignee: null
 *                  monetary_value: '$15'
 *                  deductible_donation: true
 */
router.get('/', authRequired, async (req, res, next) => {
  try {
    const filters = req.query;
    const allResources = await Resources.findAll();

    if (!filters) {
      return res.status(200).json(allResources);
    }

    const filteredResources = allResources.filter((resource) => {
      let resourceIsValid = true;
      for (let key in filters) {
        resourceIsValid =
          resourceIsValid &&
          (resource[key] === filters[key] ||
            resource[key].toLowerCase().includes(filters[key].toLowerCase()));
      }
      return resourceIsValid;
    });

    return res.status(200).json(filteredResources);
  } catch (err) {
    return next(err);
  }
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
  validNewResource,
  adminRequired,
  (req, res, next) => {
    const resource = req.body;
    Resources.Create(resource)
      .then(() => {
        res.status(201).json({ message: 'success', resource });
      })
      .catch(next);
  }
);

//update a resource

router.put(
  '/:resource_id',
  authRequired,
  validNewResource,
  adminRequired,
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

///////////////////////////MIDDLEWARE///////////////////////////////

// validate a new resource

function validNewResource(req, res, next) {
  const resource = req.body;
  if (!resource) {
    res.status(400).json({
      message: 'missing resource Data',
    });
  } else if (!resource.resource_name) {
    res.status(400).json({
      message: 'missing resource_name field',
    });
  } else if (!resource.category) {
    res.status(400).json({
      message: 'missing category field',
    });
  } else if (!resource.condition) {
    res.status(400).json({
      message: 'missing condition field',
    });
  } else {
    next();
  }
}
module.exports = router;
