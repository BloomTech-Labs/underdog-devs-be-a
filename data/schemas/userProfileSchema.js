const yup = require('yup');
/* eslint-disable */

const validateSelfUpdate = yup
  .object()
  .shape({
    email: yup.string().trim().email('invalid email provided'),
    first_name: yup
      .string()
      .trim()
      .max(255, '"first_name" must be shorter than 255 characters'),
    last_name: yup
      .string()
      .trim()
      .max(255, '"last_name" must be shorter than 255 characters'),
    location: yup.string().max(255, '"location" must be US'),
    company: yup
      .string()
      .trim()
      .max(255, '"company" must be shorter than 255 characters'),
    tech_stack: yup
      .array()
      .min(1)
      .required("User must select at least one 'tech_stack'"),
    //commented out...seems unnecessary to validate string length when the string is pre-set by the program (LA 5/27)
    // .of(
    //   yup
    //     .string()
    //     .trim()
    //     .max(255, '"tech_stack" must be shorter than 255 characters')
  })
  .noUnknown(true)
  .strict(true);

module.exports = validateSelfUpdate;
