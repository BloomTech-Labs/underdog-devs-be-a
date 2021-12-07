const validateSubjectBody = (req, res, next) => {
  const { issue } = req.body;
  if (!issue)
    return next({
      status: 400,
      message: 'You must submit an issue as a string of text',
    });
  next();
};
module.exports = {
  validateSubjectBody,
};
