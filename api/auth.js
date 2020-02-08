require('dotenv').config();
const fetch = require('node-fetch');
const cors = require('micro-cors')();

const handler = (req, res) => {
  const { access_token, redirect_uri } = req.query;
  if (!access_token) {
    return res.status(400).send(`No access_token sent`);
  }
  if (!redirect_uri) {
    return res.status(400).send(`No redirect_uri sent`);
  }

  return res.status(200).send(JSON.stringify(process.env));
  console.log('fetching...');
  fetch('', {
    method: 'post',
    body: JSON.stringify({
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      code: access_token,
      redirect_uri,
      state: 'glu'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => console.log('got response', res) || res.text())
    .then(text => console.log('got text', text) || res.status(200).send(text))
    .catch(err => {
      console.error('error', err);
      res.status(500).send(err);
    });
};

module.exports = cors(handler);
