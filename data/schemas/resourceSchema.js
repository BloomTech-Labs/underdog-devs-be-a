const yup = require('yup');

const resourceSchema = yup.object().shape({
  resource_id: yup
    .mixed()
    .oneOf([undefined], "'resource_id' must not be provided"),
  created_at: yup
    .mixed()
    .oneOf([undefined], "'created_at' field must not be provided"),
  updated_at: yup
    .mixed()
    .oneOf([undefined], "'updated_at' field must not be provided"),
  resource_name: yup
    .string()
    .trim()
    .required("'resource_name' is required")
    .min(3, "'resource_name' must contain at least 3 characters")
    .max(100, "'resource_name' must contain less than 100 characters"),
  category: yup.string().trim().required("'category' is required"),
  condition: yup.string().trim().required("'condition' is required"),
  assigned: yup.boolean(),
  current_assignee: yup.string().trim(),
  previous_assignee: yup.string().trim(),
  monetary_value: yup.string().trim(),
  deductible_donation: yup.boolean(),
});

module.exports = resourceSchema;
