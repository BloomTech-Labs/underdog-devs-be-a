const express = require('express');
const GetStarted = require('./gettingStartedModel');
const router = express.Router();

router.get('/', function (req, res) {
  GetStarted.getSecret()
    .then((response) => {
      res.status(200).json(response[0].secret);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
