const yup = require('yup');

const ticketsSchema = yup.object().shape({
  ticket_id: yup.mixed().oneOf([undefined], '"ticket_id" must not be provided'),
  ticket_type: yup
    .string()
    .trim()
    .required('"ticket type" (string) is required'),
  ticket_status: yup.string().trim(),
  ticket_subject: yup
    .string()
    .trim()
    .required('"ticket subject" (string) is required'),
  requested_for: yup.string().trim(),
  submitted_by: yup
    .string()
    .trim()
    .required('submitted by profile ID is required'),
  approved_by: yup.string().trim(),
  urgent: yup.boolean().default(false),
  notes: yup.string().trim(),
  requested_role: yup.number().positive(),
  created_at: yup
    .mixed()
    .oneOf([undefined], "'created_at' field must not be provided"),
  updated_at: yup
    .mixed()
    .oneOf([undefined], "'updated_at' field must not be provided"),
});

module.exports = ticketsSchema;
