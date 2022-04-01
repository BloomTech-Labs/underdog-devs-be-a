const Notes = require('../notes/noteModel');

const checkNoteExists = async (req, res, next) => {
  try {
    const note = await Notes.findBy({ note_id: req.params.note_id });
    if (!note) {
      next({
        status: 404,
        message: 'Note with given ID does not exist',
      });
    } else {
      //appending the already retrieved note to the req body to avoid multiple DB queries
      req.body.retrievedNote = note;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkBodyIsComplete = (req, res, next) => {
  const {
    created_by,
    content_type,
    status,
    content,
    level,
    visible_to_admin,
    visible_to_mentor,
    mentor_id,
    mentee_id,
  } = req.body;
  if (
    !created_by ||
    !content_type ||
    !status ||
    !content ||
    !level ||
    !visible_to_admin ||
    !visible_to_mentor ||
    !mentor_id ||
    !mentee_id
  ) {
    next({
      status: 400,
      message: 'Please include all note data',
    });
  } else {
    next();
  }
};

const checkUpdateInfo = (req, res, next) => {
  if (!req.params.note_id || !req.body) {
    next({
      status: 400,
      message: 'Please include note id and information to be updated',
    });
  } else {
    next();
  }
};

module.exports = {
  checkNoteExists,
  checkBodyIsComplete,
  checkUpdateInfo,
};
