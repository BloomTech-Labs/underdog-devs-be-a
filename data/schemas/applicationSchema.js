const yup = require('yup');

const sharedFields = {
  email: yup
    .string()
    .trim()
    .required('"email" (string) is required')
    .email('invalid email provided'),
  first_name: yup.string().trim().required('"first_name" (string) is required'),
  last_name: yup.string().trim().required('"last_name" (string) is required'),
  other_info: yup
    .string()
    .trim()
    .max(255, '"other_info" must be shorter than 255 characters'),
};

const mentorApplicationSchema = yup.object().shape({
  ...sharedFields,
  company: yup.string().trim(),
  commitment: yup.boolean().required('"commitment" (boolean) is required'),
});

const menteeApplicationSchema = yup.object().shape({
  ...sharedFields,

  lives_in_us: yup.boolean().required('"lives_in_us" (boolean) is required'),
  formerly_incarcerated: yup
    .boolean()
    .required('"formerly_incarcerated" (boolean) is required'),
  list_convictions: yup.string().trim(),
  experience_level: yup
    .string()
    .trim()
    .required('"experience_level" (string) is required'),
  your_hope: yup.string().trim().required('"your_hope" (string) is required'),
});

const applicationTicketSchema = yup.object().shape({
  application_id: yup
    .mixed()
    .oneOf([undefined], '"action_ticket_id" must not be provided'),
  position: yup
    .mixed()
    .required('"position" (integer) is required')
    .oneOf([3, 4], '"position" must either 3 or 4'),
  profile_id: yup.string().trim().required('"profile_id" (string) is required'),
  approved: yup.boolean(),
  created_at: yup
    .mixed()
    .oneOf([undefined], '"created_at" must not be provided'),
  updated_at: yup
    .mixed()
    .oneOf([undefined], '"updated_at" must not be provided'),
});

module.exports = {
  mentorApplicationSchema,
  menteeApplicationSchema,
  applicationTicketSchema,
};
