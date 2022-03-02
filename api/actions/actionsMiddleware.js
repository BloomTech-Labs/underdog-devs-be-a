const { findById } = require('../actions/actionsModel');

const validateSubjectBody = (req, res, next) => {
  const { issue } = req.body;
  if (!issue || issue.trim() === '' || issue.length > 600)
    next({
      status: 400,
      message:
        'You must submit an issue property as a string of text in your request',
    });
  else next();
};

const checkActionTicketExists = (req, res, next) => {
  const id = req.params.id;

  findById(id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({
          status: 400,
          message: `action ticket with id ${id} does not exist`,
        });
      }
    })
    .catch(next);
};
module.exports = {
  validateSubjectBody,
  checkActionTicketExists,
};
