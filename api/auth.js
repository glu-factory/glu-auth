module.exports = (req, res) => {
  const { access_token } = req.query;
  if (!access_token) {
    return res.status(400).send(`No access_token sent!`);
  }
  res.send(`Hello ${req.query.access_token}!`);
};
