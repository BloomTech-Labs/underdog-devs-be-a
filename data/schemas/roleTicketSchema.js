const yup = require('yup');

const roleTicketSchema = yup.object().shape({
  role_ticket_id: yup
    .mixed()
    .oneOf([undefined], "'role_ticket_id' must not be provided"),
  created_at: yup
    .mixed()
    .oneOf([undefined], "'created_at' field must not be provided"),
  updated_at: yup
    .mixed()
    .oneOf([undefined], "'updated_at' field must not be provided"),
  submitted_by: yup
    .string()
    .trim()
    .required("'submitted_by' is required"),
  subject_id: yup
    .string()
    .trim()
    .required("'subject_id' is required"),
  requested_role: yup
    .number()
    .integer()
    .positive()
    .required("a valid 'requested_role' is required"),
    approved_by: yup.string().trim(),
    comments: yup.string().trim(),
    pending: yup.boolean(),
    resolved: yup.boolean()
});

module.exports = roleTicketSchema;