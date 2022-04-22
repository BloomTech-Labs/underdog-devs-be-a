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
      req.body.retrievedNote = note;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const helper_checkProfileIdExists = async (profile_id) => {
  const profile = await Profile_Model.findById(profile_id);
  return Boolean(profile);
};

const checkMenteeIdExists = async (req, res, next) => {
  try {
    const boolean = await helper_checkProfileIdExists(
      req.params.mentee_id || req.body.mentee_id
    );
    if (!boolean) {
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

const checkMentorIdExists = async (req, res, next) => {
  try {
    const boolean = await helper_checkProfileIdExists(
      req.params.mentee_id || req.body.mentee_id
    );
    if (!boolean) {
      next({
        status: 404,
        message: 'mentor_id not found',
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
    created_by,
    content_type,
    status,
    content,
    level,
    visible_to_admin,
    visible_to_mentor,
    visible_to_mentee,
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
    !visible_to_mentee ||
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
  const { status, content, level } = req.body;
  if (!status && !content && !level) {
    next({
      status: 400,
      message: 'Please include correct information to be updated',
    });
  } else {
    next();
  }
};

const checkStatusEnum = (req, res, next) => {
  try {
    const status = req.body.status.toLowerCase().trim();
    if (
      status === 'in progress' ||
      status === 'resolved' ||
      status === 'no action needed' ||
      status === 'escalated'
    ) {
      next();
    } else {
      next({
        status: 400,
        message:
          'status must be : "in progress", "resolved", "no action needed" or "escalated"',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkNoteExists,
  checkUpdateInfo,
  checkMenteeIdExists,
  checkBodyIsComplete,
  checkMentorIdExists,
  checkStatusEnum,
};
