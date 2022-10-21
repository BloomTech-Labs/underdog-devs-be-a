const axios = require('axios');

const baseApiUrl = process.env.REACT_APP_DS_API_URL;

/*
dsGet will create an axios.get call to the ds api. It requires a string for the target path.
Example usage: 
dsGet('/collections')
*/
const dsGet = (targetPath) => {
  axios.get(`${baseApiUrl}${targetPath}`).then((res) => {
    return res.data;
  });
};

/*
dsPost will create an axios.post call to the ds api. It requires a string for the target path, and the object to send.
Example usage: 
dsPost('/read/mentor', { "profile_id": "26136eb4-7679-411c-b3cd-3ce7ec7c849b" })
dsPost still needs work to be functional. This is just the bones of the function...
*/
const dsPost = (targetPath, data) => {
  axios.post(`${baseApiUrl}${targetPath}`, data).then((res) => {
    return res.data;
  });
};

/*
dsPatch will create an axios.patch call to the ds api. It requires a string for the target path, a queryId, a queryParam, and the data to be updated.
Example usage: 

let data = {
  "text": "This is an example to test patch...",
  "mentee_id": "15cc8d85-2bba-49db-9021-f1b31e69143f",
  "mentor_id": "26136eb4-7679-411c-b3cd-3ce7ec7c849b"
}
dsPatch('/update/feedback', 'ticket_id', 'c45a570d-143e-415d-8617-7375d3639349', data)
dsPatch still needs work to be functional. This is just the bones of the function...
*/
const dsPatch = (targetPath, queryId, queryParam, data) => {
  axios
    .patch(`${baseApiUrl}${targetPath}?${queryId}=${queryParam}`, data)
    .then((res) => {
      return res.data;
    });
};

/*
dsDelete will create an axios.delete call to the ds api. It requires a a string for the target path, and
a queryId, and queryParam
Example usage: 
dsDelete('/delete/feedback', 'ticket_id', 'c45a570d-143e-415d-8617-7375d3639349')
*/
const dsDelete = (targetPath, queryId, queryParam) => {
  axios
    .delete(`${baseApiUrl}${targetPath}?${queryId}=${queryParam}`)
    .then((res) => {
      return res.data;
    });
};

module.exports = { dsGet, dsPost, dsPatch, dsDelete };
