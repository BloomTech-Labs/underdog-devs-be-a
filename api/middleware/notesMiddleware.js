const noteIdRequired = (req, res, next) => {
  if (!req.params.note_id) {
    next({
      status: 400,
      message: 'Missing Note ID',
    });
  }
};

module.exports = {
  noteIdRequired,
};
