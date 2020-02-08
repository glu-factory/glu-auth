require('dotenv').config()
const fetch = require('node-fetch');

module.exports = (req, res) => {
  const { access_token, redirect_uri } = req.query;
  if (!access_token) {
    return res.status(400).send(`No access_token sent`);
  }
  if (!redirect_uri) {
    return res.status(400).send(`No redirect_uri sent`);
  }

  
  fetch('', {
    method: 'post',
    body: JSON.stringify({
      client_id: process.env.client_id
      client_secret: process.env.client_secret
      code: access_token,
      redirect_uri,
      state: 'glu'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.text()).then((text) => res.status(200).send(text)).catch((err) => res.status(500).send(err));
};
