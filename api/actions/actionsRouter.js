const express = require('express');
const { validateSubjectBody } = require('./actionsMiddleware');
// const authRequired = require('../middleware/authRequired');
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

router.post('/', validateSubjectBody, (req, res, next) => {
  const action = req.body;
  Actions.Create(action)
    .then(() => {
      res.status(201).json({ message: 'success', action });
    })
    .catch(next);
});

router.put('/:id', validateSubjectBody, (req, res, next) => {
  const issue = req.params.subject_id;
  const changes = req.body;
  Actions.Update(issue, changes)
    .then((change) => {
      if (change) {
        Actions.findById(issue).then((success) => {
          res.status(200).json({
            message: `Action '${success.subject_id}' 
            updated`,
            success,
          });
        });
      }
    })
    .catch(next);
});

router.delete('/:id', (req, res) => {
  res.json('delete wired/fired');
});

module.exports = router;
