const bcrypt = require('bcrypt');
const rounds = 10;

class Encryptor {

  constructor(data) {
    this.hash = this.encrypt(data);
  }
  
  getHash() {
    return this.hash;
  }

  static encrypt(data) {
    return bcrypt.hash(data, rounds)
      .then(hash => hash)
      .catch(error => {
        throw new Error(error);
      })
  }

  static validate(data, hash) {
    return bcrypt.compare(data, hash)
      .then(result => result)
      .catch(error => {
        throw new Error(error);
      })
  }

}

module.exports = {
  Encryptor
}