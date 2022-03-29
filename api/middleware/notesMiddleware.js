const Notes = require('../notes/noteModel');
const Profile_Model = require('../profile/profileModel');

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

const checkProfileIdExists = async (req, res, next) => {
  try {
    const profile = await Profile_Model.findById({
      profile_id: req.params.mentee_id,
    });
    if (!profile) {
      next({
        status: 404,
        message: 'mentee_id not found',
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkBodyIsComplete = (req, res, next) => {
  const {
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
  checkProfileIdExists,
};
