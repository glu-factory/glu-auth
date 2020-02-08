if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
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

  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: access_token,
      redirect_uri,
      state: 'glu'
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(res => res.text())
    .then(text => res.status(200).send(text))
    .catch(err => res.status(500).send(err));
};

module.exports = cors(handler);
