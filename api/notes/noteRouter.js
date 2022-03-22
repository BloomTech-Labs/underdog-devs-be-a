const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Notes = require('./noteModel');
const router = express.Router();
// const axios = require('axios');
// const {
//   adminRequired,
//   superAdminRequired,
// } = require('../middleware/permissionsRequired');
// const { validateUser } = require('../middleware/generalMiddleware');

/*
need middlewares
**/
router.get('/', async (req, res, next) => {
  try {
    const notes = await Notes.findAll();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

/*
need middlewares
**/
router.get('/:note_id', async (req, res, next) => {
  try {
    const note = await Notes.findBy({ note_id: req.params.note_id });
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
});

/*
need middlewares
**/
router.get('/mentee/:profile_id_mentee', async (req, res, next) => {
  try {
    const note = await Notes.findBy({
      profile_id_mentee: req.params.profile_id_mentee,
    });
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
});

/*
need middlewares
**/
router.post('/', async (req, res, next) => {
  try {
    const newNote = {
      //   note_id: req.body.note_id,
      content_type: req.body.content_type,
      content: req.body.content,
      level: req.body.level,
      visible_to_admin: req.body.visible_to_admin,
      visible_to_moderator: req.body.visible_to_moderator,
      visible_to_mentor: req.body.visible_to_mentor,
      profile_id_mentor: req.body.profile_id_mentor,
      profile_id_mentee: req.body.profile_id_mentee,
    };
    const createdNote = await Notes.create(newNote);
    res.status(201).json(createdNote);
  } catch (error) {
    next(error);
  }
});

/*
need middlewares
**/
router.put('/:note_id', async (req, res, next) => {
  try {
    const note_id = req.params.note_id;
    const content = req.body.content;
    const updatedNote = await Notes.update(note_id, { content });
    res.status(201).json(updatedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
