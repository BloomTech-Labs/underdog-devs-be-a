const express = require('express');
const authRequired = require('../middleware/authRequired');
const Actions = require('./actionsModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
  Actions.findAll()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});
module.export = router;
