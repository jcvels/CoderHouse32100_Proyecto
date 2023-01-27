const bcrypt = require('bcrypt');
const rounds = 10;

const encrypt = (data) => {
  return bcrypt.hash(data, rounds)
    .then(hash => hash)
    .catch(error => {
      throw new Error(error);
    })
}

const validate = (data, hash) => {
  return bcrypt.compare(data, hash)
    .then(result => result)
    .catch(error => {
      throw new Error(error);
    })
}

module.exports = {
  encrypt,
  validate
}