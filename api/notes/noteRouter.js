const express = require('express');
const Notes = require('./noteModel');
const router = express.Router();
const authRequired = require('../middleware/authRequired');

const {
  checkNoteExists,
  checkBodyIsComplete,
  checkUpdateInfo,
  checkMenteeIdExists,
  checkMentorIdExists,
  checkStatusEnum,
} = require('../middleware/notesMiddleware');

router.get('/', authRequired, async (req, res, next) => {
  try {
    const notes = await Notes.findAll();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:note_id',
  authRequired,
  checkNoteExists,
  async (req, res, next) => {
    try {
      const note = req.body.retrievedNote;
      res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/mentee/:mentee_id',
  authRequired,
  checkMenteeIdExists,
  async (req, res, next) => {
    try {
      const note = await Notes.findBy({
        mentee_id: req.params.mentee_id,
      });
      res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  authRequired,
  checkBodyIsComplete,
  checkStatusEnum,
  checkMenteeIdExists,
  checkMentorIdExists,
  async (req, res, next) => {
    try {
      const newNote = {
        content_type: req.body.content_type,
        status: req.body.status,
        content: req.body.content,
        level: req.body.level,
        visible_to_admin: req.body.visible_to_admin,
        visible_to_mentor: req.body.visible_to_mentor,
        mentor_id: req.body.mentor_id,
        mentee_id: req.body.mentee_id,
      };
      const createdNote = await Notes.create(newNote);
      res.status(201).json(createdNote);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:note_id',
  authRequired,
  checkNoteExists,
  checkUpdateInfo,
  async (req, res, next) => {
    try {
      const note_id = req.params.note_id;
      const content = req.body.content;
      const updatedNote = await Notes.update(note_id, { content });
      res.status(201).json(updatedNote);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:note_id',
  authRequired,
  checkNoteExists,
  async (req, res, next) => {
    try {
      const deleted = await Notes.remove(req.params.note_id);
      if (deleted) {
        res.status(200).json({ message: 'Note successfully deleted' });
      } else {
        next({
          status: 500,
          message: 'Could not delete',
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
