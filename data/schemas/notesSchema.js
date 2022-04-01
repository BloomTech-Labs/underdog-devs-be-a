const yup = require('yup');

const notesSchema = yup.object({
  note_id: yup
    .number()
    .required('note id required')
    .integer('note id must be an integer')
    .positive('note id must be positive'),
  created_by: yup.string().required('profile id required'),
  status: yup
    .oneOf(['in progress', 'resolved', 'no action needed', 'escalated'])
    .required('status required'),
  content_type: yup.string().required('content type required'),
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
