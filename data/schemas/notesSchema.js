const yup = require('yup');

//note_id, created_at timestamp, and updated_at timestamp not included in schema because they are generated automatically for each note
const notesSchema = yup.object({
  // created_by: yup.string().required('profile id required'),
  content_type: yup.string().required('content type required'),
  status: yup
    .string()
    .oneOf(['in progress', 'resolved', 'no action needed', 'escalated'])
    .required('status required'),
  content: yup.string().required('content required'),
  level: yup.string().required('level required'),
  visible_to_admin: yup
    .boolean()
    .oneOf([true, false])
    .required('visibility to admin required'),
  visible_to_mentor: yup
    .boolean()
    .oneOf([true, false])
    .required('visibility to mentor required'),
  visible_to_mentee: yup
    .boolean()
    .oneOf([true, false])
    .required('visibility to mentee required'),
  mentor_id: yup.string().required('profile id of mentor required'),
  mentee_id: yup.string().required('profile id of mentee required'),
});

module.exports = notesSchema;
