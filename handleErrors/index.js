const { ValidationError, UniqueConstraintError } = require('sequelize');

module.exports = (err, req, res, next) => {
  //console.log(err);
  if (err instanceof UniqueConstraintError) {
    return res.status(409).send({ errors: [err.errors[0].message] });
  }
  if (err instanceof ValidationError) {
    return res.status(400).send({ errors: [err.errors[0].message] });
  }
  res.status(err.status|| 500).send({ errors: [err.message] });
};
