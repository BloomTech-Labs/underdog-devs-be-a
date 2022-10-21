const axios = require('axios')

const baseApiUrl = process.env.REACT_APP_DS_API_URL

//dsGet will create an axios.get call to the ds api. It requires a string for the target path. 
//Example usage: dsGet('/collections')

const dsGet = (targetPath) => {
    axios.get(`${baseApiUrl}${targetPath}`)
    .then(res => {return res.data})
}

//dsPost will create an axios.post call to the ds api. It requires a string for the target path, and the object to send.
//Example usage: dsPost('/read/mentor', { "profile_id": "26136eb4-7679-411c-b3cd-3ce7ec7c849b" })
const dsPost = (targetPath, data) => {
    axios.get(`${baseApiUrl}${targetPath}`)
    .then(res => {return res.data})
}

const dsUpdate = (targetPath, data) => {
    axios.get(`${baseApiUrl}${targetPath}`)
    .then(res => {return res.data})
}

const dsDelete = (targetPath, data) => {
    axios.get(`${baseApiUrl}${targetPath}`)
    .then(res => {return res.data})
}

module.exports = { dsGet, dsPost, dsUpdate, dsDelete };