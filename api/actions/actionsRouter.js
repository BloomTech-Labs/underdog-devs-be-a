const express = require('express');
const { validateSubjectBody } = require('./actionsMiddleware');
const Actions = require('./actionsModel');
const router = express.Router();

router.get('/', function (req, res) {
  Actions.findAll()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = req.params.id;
  Actions.findById(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/', validateSubjectBody, (req, res, next) => {
  const action = req.body;
  Actions.create(action)
    .then(() => {
      res.status(201).json({ message: 'success', action });
    })
    .catch(next);
});

router.put('/:id', validateSubjectBody, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Actions.update(id, changes)
    .then((change) => {
      if (change) {
        Actions.findById(id).then((success) => {
          res.status(200).json({
            message: `Action '${success.action_ticket_id}' 
            updated`,
            success,
          });
        });
      }
    })
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
