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

router.put('/', validateSubjectBody, (req, res) => {
  const changes = req.body;

  if (changes) {
    const id = changes.id;
    Actions.findById(id)
      .then(
        Actions.update(id, changes)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'ticket updated', changes: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: "couldn't update ticket",
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: 'could not find ticket',
          error: err.message,
        });
      });
  }
  // Actions.update(id, changes)
  //   .then((change) => {
  //     if (change) {
  //       Actions.findById(id).then((success) => {
  //         res.status(200).json({
  //           message: `Action '${success.action_ticket_id}'
  //           updated`,
  //           success,
  //         });
  //       });
  //     }
  //   })
  //   .catch((err) => res.json({ message: err }));
});

module.exports = router;
