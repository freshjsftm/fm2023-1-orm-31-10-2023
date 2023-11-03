const { ValidationError } = require('sequelize');

module.exports = (err, req, res, next) => {
  //console.log(err);
  if (err instanceof ValidationError) {
    return res.status(400).send({ errors: [err.errors[0].message] });
  }
  res.status(500).send({ errors: [err.message] });
};
