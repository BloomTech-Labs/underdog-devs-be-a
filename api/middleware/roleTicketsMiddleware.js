const RoleTicket = require('../roleTickets/roleTicketsModel');
const roleTicketSchema = require('../../data/schemas/roleTicketSchema');

async function checkRoleTicketIdExists(req, res, next) {
  const { role_ticket_id } = req.params;
  const badIdErr = {
    status: 404,
    message: `Role Ticket with ID ${role_ticket_id} not found!`,
  };
  try {
    const roleTicket = await RoleTicket.findByRoleTicketById(role_ticket_id);
    if (!roleTicket) {
      return next(badIdErr);
    }
    req.roleTicket = roleTicket;
    next();
  } catch (err) {
    next();
  }
}

async function validateRoleTicket(req, res, next) {
  try {
    const payload = req.body;
    const validatedRoleTicket = await roleTicketSchema.validate(payload);
    req.roleTicketInput = validatedRoleTicket;
    return next();
  } catch (err) {
    return next({
      status: 400,
      message: err.errors[0],
    });
  }
}

module.exports = { checkRoleTicketIdExists, validateRoleTicket };
