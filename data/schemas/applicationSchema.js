const yup = require('yup');

const sharedFields = {
  email: yup
    .string()
    .trim()
    .required('"email" is required')
    .email('invalid email provided'),
  location: yup.string().trim().required('"location" is required'),
  name: yup.string().trim().required('"name" is required'),
  profile_id: yup.string().trim().required('"profile_id" is required'),
  other_info: yup
    .string()
    .trim()
    .max(255, '"other_info" must be shorter than 255 characters'),
  tech_stack: yup.string().trim().required('"tech_stack" is required'),
};

const mentorApplicationSchema = yup.object().shape({
  ...sharedFields,
  mentor_intake_id: yup
    .mixed()
    .oneOf([undefined], '"mentor_intake_id" must not be provided'),
  current_comp: yup.string().trim(),
  can_commit: yup.boolean().required('"can_commit" is required'),
  how_commit: yup
    .string()
    .trim()
    .max(255, '"how_commit" must be shorter than 255 characters'),
});

const menteeApplicationSchema = yup.object().shape({
  ...sharedFields,
  mentee_intake_id: yup
    .mixed()
    .oneOf([undefined], '"mentee_intake_id" must not be provided'),
  lives_in_us: yup.boolean().required('"lives_in_us" is required'),
  formerly_incarcerated: yup
    .boolean()
    .required('"formerly_incarcerated" is required'),
  list_convictions: yup.string().trim(),
  experience_level: yup
    .string()
    .trim()
    .required('"experience_level" is required'),
  your_hope: yup.string().trim().required('"your_hope" is required'),
});

const applicationTicketSchema = yup.object().shape({
  application_id: yup
    .mixed()
    .oneOf([undefined], '"action_ticket_id" must not be provided'),
  position: yup
    .mixed()
    .required('"position" is required')
    .oneOf([3, 4], '"position" must either 3 or 4'),
  profile_id: yup.string().trim().required('"profile_id" is required'),
  approved: yup.boolean(),
  created_at: yup.oneOf([undefined], '"created_at" must not be provided'),
  updated_at: yup.oneOf([undefined], '"updated_at" must not be provided'),
});

module.exports = {
  mentorApplicationSchema,
  menteeApplicationSchema,
  applicationTicketSchema,
};
