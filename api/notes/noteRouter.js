const express = require('express');
// const authRequired = require('../middleware/authRequired');
// const Notes = require('./noteModel');
const router = express.Router();
// const axios = require('axios');
// const {
//   adminRequired,
//   superAdminRequired,
// } = require('../middleware/permissionsRequired');
// const { validateUser } = require('../middleware/generalMiddleware');

router.get('/', async (req, res, next) => {
  try {
    res.status(501).json({ message: 'get not ready' });
  } catch (error) {
    next(error);
  }
});

router.get('/:note_id', async (req, res, next) => {
  try {
    res.status(501).json({ message: 'get note_id not ready' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(501).json({ message: 'post not ready' });
  } catch (error) {
    next(error);
  }
});

router.put('/:note_id', async (req, res, next) => {
  try {
    res.status(501).json({ message: 'put by noted_id not ready' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:note_id', async (req, res, next) => {
  try {
    res.status(501).json({ message: 'delete by note_id not ready' });
  } catch (error) {
    next(error);
  }
});
