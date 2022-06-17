const yup = require('yup');

const menteeApplicationSchema = yup.object({
  first_name: yup.string().required('first name required'),
  last_name: yup.string().required('last name required'),
  email: yup.string().email().required('email required'),
  country: yup.string().required('country required'),
  subject: yup.string().required('subject required'),
});

module.exports = menteeApplicationSchema;
