const {
  findRoleIdByProfileId,
  findCurrentProgress,
  findProgressById,
} = require('./progressionModel');

const validateProgressId = (req, res, next) => {
  const { progress_id } = req.body;
  if (progress_id > 5 || progress_id < 1) {
    res.status(400).json({ message: 'Invalid progress_id. Valid ids are 1-5' });
  } else {
    next();
  }
};

const checkIfMentee = async (req, res, next) => {
  const { profile_id } = req.params;
  try {
    const { role_id } = await findRoleIdByProfileId(profile_id);
    if (role_id != 4) {
      res.status(400).json({ message: 'Requested user is not a mentee' });
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};

const checkMenteeProgress = async (req, res, next) => {
  const { profile_id } = req.params;
  const current_progress = req.body.progress_id;
  try {
    const { progress_id } = await findCurrentProgress(profile_id);
    if (current_progress == progress_id) {
      findProgressById(current_progress);
      res
        .status(400)
        .json({ message: 'This is already their current progress' });
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};

module.exports = {
  checkIfMentee,
  checkMenteeProgress,
  validateProgressId,
};
