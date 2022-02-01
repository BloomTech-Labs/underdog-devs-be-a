const yup = require('yup');

const mentorApplicationSchema = yup.object().shape({
  mentor_intake_id: yup
    .mixed()
    .oneOf([undefined], '"mentor_intake_id" must not be provided'),
  profile_id: yup.string().trim().required('"profile_id" is required'),
  email: yup
    .string()
    .trim()
    .required('"email" is required')
    .email('invalid email provided'),
  location: yup.string().trim().required('"location" is required'),
  name: yup.string().trim().required('"name" is required'),
  current_comp: yup.string().trim(),
  tech_stack: yup.string().trim().required('"tech_stack" is required'),
  can_commit: yup.boolean().required('"can_commit" is required'),
  how_commit: yup
    .string()
    .trim()
    .max(255, '"how_commit" must be shorter than 255 characters'),
  other_info: yup
    .string()
    .trim()
    .max(255, '"other_info" must be shorter than 255 characters'),
});

const menteeApplicationSchema = yup.object().shape({
  mentee_intake_id: yup
    .mixed()
    .oneOf([undefined], '"mentee_intake_id" must not be provided'),
  profile_id: yup.string().trim().required('"profile_id" is required'),
  email: yup
    .string()
    .trim()
    .required('"email" is required')
    .email('invalid email provided'),
  location: yup.string().trim().required('"location" is required'),
  name: yup.string().trim().required('"name" is required'),
  lives_in_us: yup.boolean().required('"lives_in_us" is required'),
  formerly_incarcerated: yup
    .boolean()
    .required('"formerly_incarcerated" is required'),
  list_convictions: yup.string().trim(),
  tech_stack: yup.string().trim().required('"tech_stack" is required'),
  experience_level: yup
    .string()
    .trim()
    .required('"experience_level" is required'),
  your_hope: yup.string().trim().required('"your_hope" is required'),
  other_info: yup
    .string()
    .trim()
    .max(255, '"other_info" must be shorter than 255 characters'),
});

module.exports = {
  mentorApplicationSchema,
  menteeApplicationSchema,
};
