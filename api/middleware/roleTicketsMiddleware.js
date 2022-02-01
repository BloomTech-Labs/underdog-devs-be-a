const RoleTicket = require('../roleTickets/roleTicketsModel');

async function checkRoleTicketIdExists(req, res, next) {
  const { role_ticket_id } = req.params;
  const badIdErr = {
    status: 404,
    message: `Role Ticket with ID ${role_ticket_id} not found!`,
  };
  try {
    const roleTicket = await RoleTicket.findByRoleTicketById(role_ticket_id);
    if (!roleTicket) {
      next(badIdErr);
    }
    req.roleTicket = roleTicket;
    next();
  } catch (err) {
    next();
  }
}

module.exports = { checkRoleTicketIdExists };
