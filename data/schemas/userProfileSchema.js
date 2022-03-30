const yup = require('yup');
/* eslint-disable */

const validateSelfUpdate = yup.object().shape({
    
    email: yup
    .string()
    .trim()
    .email('invalid email provided'),
    first_name: yup
    .string()
    .trim()
    .max(255, '"first_name" must be shorter than 255 characters'),
    last_name: yup
    .string()
    .trim()
    .max(255, '"last_name" must be shorter than 255 characters'),
    location: yup
    .string()
    .max(255, '"location" must be shorter than 255 characters'),
    company: yup
    .string()
    .trim()
    .max(255, '"company" must be shorter than 255 characters'),
    tech_stack: yup
    .array()
    .of(yup.string().trim().max(255, '"tech_stack" must be shorter than 255 characters')),

}).noUnknown(true).strict(true);


module.exports = validateSelfUpdate
