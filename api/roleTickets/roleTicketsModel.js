const db = require('../../data/db-config');

const findAllRoleTickets = async () => {
  return await db('role_tickets');
};

const findByRoleTicketById = async (roleTicketId) => {
  return db
    .select('*')
    .from('role_tickets')
    .where('role_ticket_id', roleTicketId)
    .first();
};

const Create = async (newRoleTicket) => {
  const [roleTicket] = await db('role_tickets')
    .insert(newRoleTicket)
    .returning([
      'role_ticket_id',
      'submitted_by',
      'subject_id',
      'requested_role',
      'approved_by',
      'comments',
      'pending',
      'resolved',
      'created_at',
      'updated_at',
    ]);
  return roleTicket;
};

module.exports = { findAllRoleTickets, findByRoleTicketById, Create };
