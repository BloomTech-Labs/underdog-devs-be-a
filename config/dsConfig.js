module.exports = {
  baseURL: process.env.DS_API_URL,
  headers: {
    Authorization: process.env.DS_API_TOKEN,
  },
};
