const express = require('express');
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
module.exports = router;
