module.exports = (req, res) => {
  const { access_token } = req.query;
  if (access_token) {
    res.status(400).send(`No access_token sent!`);
  }
  res.send(`Hello ${req.query.access_token}!`);
};
