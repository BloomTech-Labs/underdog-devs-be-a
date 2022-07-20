const express = require('express');
const Notes = require('./noteModel');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validation = require('../helpers/validation');
const notesSchema = require('../../data/schemas/notesSchema');

const {
  checkNoteExists,
  checkUpdateInfo,
  checkMenteeIdExists,
  checkMentorIdExists,
  checkStatusEnum,
  checkBodyIsComplete,
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
      const note = await Notes.filterBy({
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
  validation(notesSchema),
  checkBodyIsComplete,
  checkStatusEnum,
  checkMenteeIdExists,
  checkMentorIdExists,
  async (req, res, next) => {
    try {
      const newNote = {
        created_by: req.body.created_by,
        content_type: req.body.content_type,
        status: req.body.status,
        content: req.body.content,
        level: req.body.level,
        visible_to_admin: req.body.visible_to_admin,
        visible_to_mentor: req.body.visible_to_mentor,
        visible_to_mentee: req.body.visible_to_mentee,
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
      const { status, content, level } = req.body;
      const updates = {};
      if (status) {
        updates.status = status;
      }
      if (content) {
        updates.content = content;
      }
      if (level) {
        updates.level = level;
      }
      const updatedNote = await Notes.update(note_id, updates);
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

router.get('/:id/comments', authRequired, async (req, res, next) => {
  try {
    const comments = await Notes.getNoteComments(req.params.id);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

router.post('/:note_id/comments', authRequired, async (req, res, next) => {
  try {
    const newComment = {
      comment_text: req.body.comment_text,
      note_id: req.params.note_id,
    };
    const comment = await Notes.createNoteComments(newComment);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
